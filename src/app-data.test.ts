import { describe, expect, it } from "vitest";
import { DEFAULT_PROMPT, buildBrief, buildFollowUpResponse } from "./app-data";

describe("Generated Property Brief data", () => {
  it("contains the minimum tp-001 brief structure", () => {
    const brief = buildBrief();

    expect(DEFAULT_PROMPT).toBe("find best options for home in Mallorca");
    expect(brief.summary).toContain("Mallorca");
    expect(brief.properties).toHaveLength(3);
    expect(brief.tradeoffs.map((tradeoff) => tradeoff.label)).toEqual([
      "Privacy",
      "Sea access",
      "Palma convenience",
      "Investment confidence",
    ]);
    expect(brief.tradeoffs.every((tradeoff) => tradeoff.verdict && !("score" in tradeoff))).toBe(
      true,
    );
    expect(brief.nextQuestion).toContain("priority");
  });

  it("answers a relevant follow-up from static brief data", () => {
    expect(buildFollowUpResponse("Which one is best for sea views?")).toContain("Vista del Puerto");
  });
});
