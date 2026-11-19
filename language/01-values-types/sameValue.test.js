/**
 * sameValue — the SameValue algorithm that Object.is uses.
 */
import { describe, it, expect } from "vitest";
import { sameValue } from "./sameValue.js";

describe("sameValue", () => {
  it("is true for identical primitives", () => {
    expect(sameValue(1, 1)).toBe(true);
    expect(sameValue("a", "a")).toBe(true);
  });

  it("does not convert types", () => {
    expect(sameValue(1, "1")).toBe(false);
    expect(sameValue(0, false)).toBe(false);
  });

  it("treats NaN as equal to NaN", () => {
    expect(sameValue(NaN, NaN)).toBe(true);
  });

  it("treats 0 and -0 as different", () => {
    expect(sameValue(0, -0)).toBe(false);
    expect(sameValue(-0, 0)).toBe(false);
  });

  // Two objects that look the same are still two different objects.
  it.todo("compares objects by reference, not contents");
});
