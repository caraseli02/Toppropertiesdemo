import { describe, expect, it } from "vitest";
import {
  BRIEF_PRIMITIVE_SET,
  DEFAULT_PROMPT,
  buildBrief,
  buildFollowUpResponse,
  composeBriefViewModel,
} from "./app-data";

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

  it("maps brief data into the safe primitive view model", () => {
    const viewModel = composeBriefViewModel(buildBrief());

    expect(BRIEF_PRIMITIVE_SET).toEqual([
      "editorial-hero",
      "suggestion-chip",
      "summary-panel",
      "property-card",
      "tradeoff-card",
      "next-question-panel",
      "follow-up-note",
      "persistent-composer",
    ]);
    expect(viewModel.properties[0]).toMatchObject({
      alt: "Can Rebassa luxury home in Sóller, Tramuntana foothills",
      stats: [
        { icon: "bed", label: "Bedrooms", value: "5 beds" },
        { icon: "bath", label: "Bathrooms", value: "4 baths" },
        { icon: "square", label: "Area", value: "620 m²" },
      ],
    });
    expect(viewModel.tradeoffs).toHaveLength(4);
  });

  it("answers a relevant follow-up from static brief data", () => {
    expect(buildFollowUpResponse("Which one is best for sea views?")).toContain("Vista del Puerto");
  });
});
