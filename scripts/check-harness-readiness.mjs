#!/usr/bin/env node

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function readText(relativePath) {
  return readFileSync(path.join(rootDir, relativePath), "utf8");
}

function requireFile(relativePath) {
  if (!existsSync(path.join(rootDir, relativePath))) {
    failures.push(`Missing required harness file: ${relativePath}`);
  }
}

function requireText(relativePath, text) {
  if (!readText(relativePath).includes(text)) {
    failures.push(`${relativePath} must mention: ${text}`);
  }
}

function requireEveryText(relativePath, values) {
  for (const value of values) {
    requireText(relativePath, value);
  }
}

function parseJson(relativePath) {
  try {
    return JSON.parse(readText(relativePath));
  } catch (error) {
    failures.push(`${relativePath} is not valid JSON: ${error.message}`);
    return null;
  }
}

function walkFiles(relativePath, ignoredDirs = new Set([".git", "node_modules", "build"])) {
  const absolutePath = path.join(rootDir, relativePath);
  if (!existsSync(absolutePath)) {
    return [];
  }

  const stats = statSync(absolutePath);
  if (stats.isFile()) {
    return [relativePath];
  }

  const files = [];
  for (const entry of readdirSync(absolutePath)) {
    if (ignoredDirs.has(entry)) {
      continue;
    }

    const child = path.join(relativePath, entry);
    const childStats = statSync(path.join(rootDir, child));
    if (childStats.isDirectory()) {
      files.push(...walkFiles(child, ignoredDirs));
    } else {
      files.push(child);
    }
  }
  return files;
}

function checkRequiredFiles() {
  for (const file of [
    "AGENTS.md",
    "CLAUDE.md",
    "CONTEXT.md",
    "DECISIONS.md",
    "PROGRESS.md",
    "docs/QUALITY.md",
    "docs/architecture.md",
    "docs/harness/clean-state-checklist.md",
    "docs/harness/evaluator-rubric.md",
    "docs/harness/lecture-readiness-check.md",
    "docs/harness/session-handoff.md",
    "docs/harness/sprint-contract.md",
    "feature_list.json",
    "init.sh",
    "package.json",
    "pnpm-lock.yaml",
    "pnpm-workspace.yaml",
    "scripts/check-harness-readiness.mjs",
    "tasks.md",
    "vite.config.ts",
  ]) {
    requireFile(file);
  }
}

function checkInstructionRouter() {
  const agents = readText("AGENTS.md");
  const lines = agents.split("\n").length;
  if (lines > 220) {
    failures.push(`AGENTS.md should stay router-sized; current line count is ${lines}`);
  }

  requireEveryText("AGENTS.md", [
    "Current approved direction",
    "Current stack baseline",
    "Quick start",
    "Scope guardrails",
    "Clock-in / clock-out protocol",
    "Topic docs",
    "vp install",
    "vp dev",
    "vp test",
    "vp check",
    "vp build",
    "docs/harness/lecture-readiness-check.md",
  ]);
}

function checkStateAndFeedbackArtifacts() {
  requireEveryText("PROGRESS.md", [
    "## Done",
    "## In Progress",
    "## Blocked",
    "## Next Steps",
    "## Verification Status",
  ]);
  requireEveryText("DECISIONS.md", ["**Decision:**", "**Reason:**"]);
  requireEveryText("docs/QUALITY.md", [
    "Quality:",
    "Verification passing:",
    "Agent understandable:",
    "Known gaps:",
    "Next improvement:",
  ]);
  requireEveryText("docs/harness/sprint-contract.md", [
    "Feature id:",
    "Scope",
    "Exclusions",
    "Verification Standards",
    "Passing Definition",
  ]);
  requireEveryText("docs/harness/evaluator-rubric.md", [
    "Product behavior",
    "Verification evidence",
    "Handoff readiness",
  ]);
  requireEveryText("docs/harness/clean-state-checklist.md", [
    "./init.sh",
    "vp test",
    "vp check",
    "vp build",
    "No temporary debug files",
  ]);
  requireEveryText("docs/harness/session-handoff.md", [
    "Verified Now",
    "Changed This Session",
    "Broken Or Unverified",
    "Next Best Step",
  ]);
}

function checkLectureCoverage() {
  for (let lecture = 1; lecture <= 12; lecture += 1) {
    requireText(
      "docs/harness/lecture-readiness-check.md",
      `Lecture ${String(lecture).padStart(2, "0")}`,
    );
  }

  requireEveryText("docs/harness/lecture-readiness-check.md", [
    "Definition of Done",
    "five-subsystem",
    "system of record",
    "router",
    "state persistence",
    "startup readiness",
    "WIP=1",
    "feature list",
    "termination",
    "end-to-end",
    "observability",
    "clean state",
  ]);
}

function checkFeatureList() {
  const featureList = parseJson("feature_list.json");
  if (!featureList) {
    return;
  }

  const rules = featureList.rules ?? {};
  for (const rule of [
    "single_active_feature",
    "passing_requires_evidence",
    "do_not_skip_verification",
    "clean_state_required",
  ]) {
    if (rules[rule] !== true) {
      failures.push(`feature_list.json rules.${rule} must be true`);
    }
  }

  const statuses = new Set(["not_started", "in_progress", "blocked", "passing"]);
  const features = Array.isArray(featureList.features) ? featureList.features : [];
  if (features.length === 0) {
    failures.push("feature_list.json must contain at least one feature");
  }

  const activeFeatures = features.filter((feature) => feature.status === "in_progress");
  if (activeFeatures.length > 1) {
    failures.push(
      `feature_list.json must have at most one in_progress feature; found ${activeFeatures.length}`,
    );
  }

  for (const feature of features) {
    if (!feature.id || !feature.title || !feature.user_visible_behavior) {
      failures.push("Each feature must include id, title, and user_visible_behavior");
    }
    if (!statuses.has(feature.status)) {
      failures.push(
        `Feature ${feature.id ?? "(missing id)"} has invalid status: ${feature.status}`,
      );
    }
    if (!Array.isArray(feature.verification) || feature.verification.length === 0) {
      failures.push(`Feature ${feature.id ?? "(missing id)"} must include verification steps`);
    }
    if (!Array.isArray(feature.evidence)) {
      failures.push(`Feature ${feature.id ?? "(missing id)"} must include an evidence array`);
    }
    if (feature.status === "passing" && feature.evidence.length === 0) {
      failures.push(`Passing feature ${feature.id} must include evidence`);
    }
  }
}

function checkToolchain() {
  const packageJson = parseJson("package.json");
  if (!packageJson) {
    return;
  }

  for (const scriptName of ["dev", "test", "check", "build"]) {
    if (!packageJson.scripts?.[scriptName]?.includes("vp")) {
      failures.push(`package.json script ${scriptName} must use vp`);
    }
  }

  if (!packageJson.packageManager?.startsWith("pnpm@")) {
    failures.push("package.json must pin the package manager with pnpm@...");
  }

  const tests = walkFiles("src").filter((file) => /\.(test|spec)\.(js|jsx|ts|tsx)$/.test(file));
  if (tests.length === 0) {
    failures.push("At least one Vitest smoke/unit test must exist under src/");
  }
}

function checkDebugArtifacts() {
  for (const file of walkFiles("src")) {
    const text = readText(file);
    for (const marker of ["debugger", "console.log", "TODO", "FIXME"]) {
      if (text.includes(marker)) {
        failures.push(`${file} contains stale debug marker: ${marker}`);
      }
    }
  }

  const tempFilePatterns = [/\.tmp$/, /\.log$/, /debug/i];
  for (const file of walkFiles(".")) {
    if (tempFilePatterns.some((pattern) => pattern.test(file))) {
      failures.push(`Temporary or debug artifact should not be committed: ${file}`);
    }
  }
}

checkRequiredFiles();
checkInstructionRouter();
checkStateAndFeedbackArtifacts();
checkLectureCoverage();
checkFeatureList();
checkToolchain();
checkDebugArtifacts();

if (failures.length > 0) {
  console.error("Harness readiness check failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Harness readiness check passed.");
