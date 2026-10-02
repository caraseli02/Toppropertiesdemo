import { describe, expect, it } from "vite-plus/test";
import { DEFAULT_FILTERS, filtersToQuery, queryToFilters } from "@/lib/filters";

describe("listings filter query sync", () => {
  it("round-trips default filters to an empty query string", () => {
    expect(filtersToQuery(DEFAULT_FILTERS).toString()).toBe("");
    expect(queryToFilters(new URLSearchParams())).toEqual(DEFAULT_FILTERS);
  });

  it("round-trips active filters through URL search params", () => {
    const filters = {
      ...DEFAULT_FILTERS,
      mode: "sale" as const,
      q: "French Riviera",
      type: "Villa" as const,
      minBeds: 3,
      tags: ["Beachfront", "Sea View"],
    };

    const restored = queryToFilters(filtersToQuery(filters));
    expect(restored).toEqual(filters);
  });

  it("clears filters when the query string is emptied", () => {
    const active = filtersToQuery({
      ...DEFAULT_FILTERS,
      mode: "long-rent",
      q: "Mykonos",
    });

    expect(queryToFilters(active).mode).toBe("long-rent");
    expect(queryToFilters(new URLSearchParams()).mode).toBe("all");
    expect(queryToFilters(new URLSearchParams()).q).toBe("");
  });
});
