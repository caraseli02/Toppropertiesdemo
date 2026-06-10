import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges class names without dropping intent", () => {
    expect(cn("px-2", undefined, "px-4", "text-sm")).toBe("px-4 text-sm");
  });
});
