import { describe, expect, it } from "vite-plus/test";
import { properties } from "@/data/properties";

describe("luxury real estate mvp baseline", () => {
  it("loads curated property data for the listings experience", () => {
    expect(properties.length).toBeGreaterThan(0);
    expect(properties.some((property) => property.featured)).toBe(true);
  });
});
