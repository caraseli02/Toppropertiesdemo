import { describe, expect, it } from "vitest";
import { composePrototypeBrief, defaultPrompt } from "./prototype";

describe("composePrototypeBrief", () => {
  it("keeps the showcase scoped to Mallorca luxury homes", () => {
    const brief = composePrototypeBrief(defaultPrompt);

    expect(brief.location).toBe("Mallorca");
    expect(brief.matches).toHaveLength(3);
    expect(brief.areas.map((area) => area.area)).toEqual(["Port d'Andratx", "Son Vida", "Deia"]);
  });

  it("falls back to the hero prompt when input is blank", () => {
    const brief = composePrototypeBrief(" ");

    expect(brief.prompt).toBe(defaultPrompt);
    expect(brief.intent).toBe("Move / second-home lens");
  });
});
