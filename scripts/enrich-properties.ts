/**
 * Local LLM Property Enrichment Worker
 *
 * Processes property listings through a local Ollama model (Gemma 4 E4B)
 * to generate enriched metadata: SEO titles, meta descriptions, slugs,
 * social media copy, classification, and normalized pricing.
 *
 * Usage:
 *   npx tsx scripts/enrich-properties.ts [--model gemma4:e4b] [--output json|ts]
 *
 * Requirements:
 *   - Ollama running locally (localhost:11434)
 *   - Gemma 4 E4B model pulled (ollama pull gemma4:e4b)
 *   - Works on Mac Mini M1 16GB at ~10-13 tok/s
 *
 * Cost: $0.00 (all local inference)
 * Speed: ~60-90s per property on M1
 */

import { properties } from "../src/data/properties";
import type { PropertyEnrichment, PropertyCategory, LuxuryTier } from "../src/types/enrichment";

const OLLAMA_URL = process.env.OLLAMA_URL || "http://localhost:11434";
const DEFAULT_MODEL = "gemma4:e4b";

// ── Types ──────────────────────────────────────────────────────────

interface OllamaResponse {
  message: { content: string };
  total_duration: number;
  eval_count: number;
}

interface EnrichmentResult {
  propertyId: string;
  title: string;
  success: boolean;
  data?: PropertyEnrichment;
  error?: string;
  tokens?: number;
  durationMs?: number;
  tokPerSec?: number;
}

// ── Ollama API ─────────────────────────────────────────────────────

async function callOllama(
  model: string,
  systemPrompt: string,
  userPrompt: string,
  temperature = 0.3,
  maxTokens = 2048
): Promise<OllamaResponse> {
  const body = {
    model,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    stream: false,
    options: { num_predict: maxTokens, temperature },
  };

  const res = await fetch(`${OLLAMA_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(`Ollama error: ${res.status} ${await res.text()}`);
  }

  return (await res.json()) as OllamaResponse;
}

function extractJSON(text: string): string {
  // Strip markdown code fences if present
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  return match ? match[1].trim() : text.trim();
}

// ── Enrichment Prompts ─────────────────────────────────────────────

const ENRICHMENT_SYSTEM = `You are a real estate data enrichment worker. You receive raw property listing data and extract/normalize fields. Always respond with valid JSON only, no other text. No markdown fences.`;

const MARKETING_SYSTEM = `You are a real estate copywriter. You receive property data and generate marketing copy. Always respond with valid JSON only, no markdown fences.`;

function buildEnrichmentPrompt(p: (typeof properties)[number]): string {
  return `Enrich this raw property listing. Extract the following fields and respond as JSON:
- "country": extracted country name
- "currency": ISO 4217 currency code (EUR, USD, GBP, CHF, JPY, AUD, CAD, SGD)
- "priceNumeric": numeric price value (no currency symbol or commas)
- "pricePerSqft": price divided by sqft number
- "propertyCategory": one of: villa, apartment, penthouse, chalet, mansion, townhouse, estate, loft
- "luxuryTier": one of: ultra-luxury (>$10M), luxury ($5-10M), premium (<$5M)
- "keyFeatures": array of max 5 short feature tags extracted from description and amenities
- "seoMetaTitle": max 60 chars, SEO-optimized
- "seoMetaDescription": max 160 chars, compelling meta description
- "tagline": catchy marketing tagline, max 10 words
- "slug": URL-friendly slug (lowercase, hyphens, include location)
- "socialBullets": array of 3 social media bullet points, each max 25 words

Raw data:
{"title": "${p.title}", "location": "${p.location}", "price": "${p.price}", "beds": ${p.beds}, "baths": ${p.baths}, "sqft": "${p.sqft}", "yearBuilt": ${p.yearBuilt ?? "null"}, "propertyType": "${p.propertyType ?? "unknown"}", "description": "${p.description ?? ""}", "amenities": ${JSON.stringify(p.amenities ?? [])}}

Property ID: ${p.id}`;
}

// ── Batch Processing ───────────────────────────────────────────────

async function enrichProperty(
  p: (typeof properties)[number],
  model: string
): Promise<EnrichmentResult> {
  const start = Date.now();
  const result: EnrichmentResult = {
    propertyId: p.id,
    title: p.title,
    success: false,
  };

  try {
    const response = await callOllama(
      model,
      ENRICHMENT_SYSTEM,
      buildEnrichmentPrompt(p),
      0.3,
      2048
    );

    const durationMs = Date.now() - start;
    const tokPerSec = response.eval_count / (response.total_duration / 1e9);

    const raw = extractJSON(response.message.content);
    const parsed = JSON.parse(raw);

    result.success = true;
    result.data = {
      id: p.id,
      country: parsed.country,
      currency: parsed.currency,
      priceNumeric: parsed.priceNumeric,
      pricePerSqft: parsed.pricePerSqft,
      propertyCategory: parsed.propertyCategory as PropertyCategory,
      luxuryTier: parsed.luxuryTier as LuxuryTier,
      keyFeatures: parsed.keyFeatures,
      seoMetaTitle: parsed.seoMetaTitle,
      seoMetaDescription: parsed.seoMetaDescription,
      tagline: parsed.tagline,
      slug: parsed.slug,
      socialBullets: parsed.socialBullets,
    };
    result.tokens = response.eval_count;
    result.durationMs = durationMs;
    result.tokPerSec = Math.round(tokPerSec * 10) / 10;
  } catch (err) {
    result.error = err instanceof Error ? err.message : String(err);
    result.durationMs = Date.now() - start;
  }

  return result;
}

async function enrichBatch(
  props: (typeof properties)[number][],
  model: string
): Promise<EnrichmentResult[]> {
  const results: EnrichmentResult[] = [];
  const total = props.length;

  console.log(`\n🚀 Enriching ${total} properties with ${model}...\n`);

  for (let i = 0; i < total; i++) {
    const p = props[i];
    process.stdout.write(`  [${i + 1}/${total}] ${p.title}... `);

    const result = await enrichProperty(p, model);
    results.push(result);

    if (result.success) {
      console.log(
        `✅ ${result.tokens}tok ${result.tokPerSec}tok/s ${result.durationMs}ms`
      );
    } else {
      console.log(`❌ ${result.error}`);
    }
  }

  return results;
}

// ── Output ─────────────────────────────────────────────────────────

function printSummary(results: EnrichmentResult[]): void {
  const success = results.filter((r) => r.success);
  const failed = results.filter((r) => !r.success);
  const totalTokens = success.reduce((sum, r) => sum + (r.tokens ?? 0), 0);
  const totalTime = success.reduce((sum, r) => sum + (r.durationMs ?? 0), 0);
  const avgTokPerSec =
    success.length > 0
      ? success.reduce((sum, r) => sum + (r.tokPerSec ?? 0), 0) / success.length
      : 0;

  console.log("\n" + "═".repeat(60));
  console.log("📊 ENRICHMENT SUMMARY");
  console.log("═".repeat(60));
  console.log(`  Properties:  ${success.length}/${results.length} successful`);
  console.log(`  Total tokens: ${totalTokens.toLocaleString()}`);
  console.log(`  Total time:   ${(totalTime / 1000).toFixed(1)}s`);
  console.log(`  Avg speed:    ${avgTokPerSec.toFixed(1)} tok/s`);
  console.log(`  API cost:     $0.00 (all local inference)`);
  console.log("═".repeat(60));

  if (failed.length > 0) {
    console.log("\n❌ Failed:");
    failed.forEach((f) => console.log(`  - ${f.title}: ${f.error}`));
  }

  // Print sample output
  if (success.length > 0) {
    console.log("\n📝 Sample enriched property:");
    const sample = success[0].data!;
    console.log(JSON.stringify(sample, null, 2));
  }
}

// ── Main ───────────────────────────────────────────────────────────

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  const modelIdx = args.indexOf("--model");
  const model = modelIdx !== -1 ? args[modelIdx + 1] : DEFAULT_MODEL;
  const outputIdx = args.indexOf("--output");
  const outputFormat = outputIdx !== -1 ? args[outputIdx + 1] : "json";

  // Check Ollama is running
  try {
    const res = await fetch(`${OLLAMA_URL}/api/tags`);
    if (!res.ok) throw new Error("not ok");
    console.log(`✅ Ollama connected at ${OLLAMA_URL}`);
  } catch {
    console.error(
      `❌ Ollama not running at ${OLLAMA_URL}. Start with: ollama serve`
    );
    process.exit(1);
  }

  const results = await enrichBatch([...properties], model);
  printSummary(results);

  // Output enriched data
  const successData = results
    .filter((r) => r.success && r.data)
    .map((r) => r.data!);

  if (outputFormat === "json") {
    const outPath = "./enriched-properties.json";
    const fs = await import("fs");
    fs.writeFileSync(outPath, JSON.stringify(successData, null, 2));
    console.log(`\n💾 Saved ${successData.length} enriched properties to ${outPath}`);
  } else if (outputFormat === "ts") {
    const outPath = "./src/data/enriched-properties.ts";
    const fs = await import("fs");
    const content = [
      `import type { PropertyEnrichment } from "@/types/enrichment";`,
      ``,
      `export const enrichedProperties: readonly PropertyEnrichment[] = ${JSON.stringify(successData, null, 2)} as const;`,
    ].join("\n");
    fs.writeFileSync(outPath, content);
    console.log(`\n💾 Saved ${successData.length} enriched properties to ${outPath}`);
  }
}

main().catch(console.error);
