/**
 * countOccurrences — counts items strictly equal (===) to target.
 */
import { describe, it, expect } from "vitest";
import { countOccurrences } from "./countOccurrences.js";

describe("countOccurrences", () => {
  it("counts matching numbers", () => {
    expect(countOccurrences([1, 2, 1, 3, 1], 1)).toBe(3);
  });

  it("counts matching strings", () => {
    expect(countOccurrences(["a", "b", "a"], "a")).toBe(2);
  });

  it("returns 0 when there are no matches", () => {
    expect(countOccurrences([1, 2, 3], 4)).toBe(0);
  });

  it("uses strict equality", () => {
    expect(countOccurrences([1, "1", 1], 1)).toBe(2);
  });

  it.todo("returns 0 for an empty array");
});
