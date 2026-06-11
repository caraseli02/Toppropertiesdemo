import { describe, expect, it } from "vitest";
import { createDiscoveryBrief } from "./discovery.js";

const sampleProperties = [
  {
    id: "deia-sea-villa",
    title: "Deià Sea Villa",
    location: "Deià",
    priceLabel: "€7.8M",
    fit: "privacy",
    highlights: ["sea views", "olive terraces"],
  },
  {
    id: "palma-penthouse",
    title: "Palma Old Town Penthouse",
    location: "Palma",
    priceLabel: "€3.2M",
    fit: "city access",
    highlights: ["walkable restaurants"],
  },
];

describe("createDiscoveryBrief", () => {
  it("turns a buyer prompt into a curated Mallorca brief", () => {
    const brief = createDiscoveryBrief("find best options for home in Mallorca", sampleProperties);

    expect(brief.intent).toBe("home search");
    expect(brief.location).toBe("Mallorca");
    expect(brief.heroPrompt).toBe("find best options for home in Mallorca");
    expect(brief.sections.map((section) => section.kind)).toEqual([
      "curated-properties",
      "neighborhood-intelligence",
    ]);
    expect(brief.sections[0].items).toHaveLength(2);
  });
});
