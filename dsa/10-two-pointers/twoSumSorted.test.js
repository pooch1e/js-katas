/**
 * twoSumSorted(sorted, target) — [i, j] with i < j, or null. O(n) time, O(1) space.
 */
import { describe, it, expect } from "vitest";
import { twoSumSorted } from "./twoSumSorted.js";

describe("twoSumSorted", () => {
  it("finds the pair", () => {
    expect(twoSumSorted([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it("finds a pair at the far ends", () => {
    expect(twoSumSorted([1, 3, 4, 6, 10], 11)).toEqual([0, 4]);
  });

  it("returns null when there is none", () => {
    expect(twoSumSorted([1, 2, 3], 100)).toBeNull();
  });

  it("is O(n) on a large input", () => {
    const big = Array.from({ length: 1_000_000 }, (_, i) => i);
    expect(twoSumSorted(big, 1_999_997)).toEqual([999_998, 999_999]);
  });

  it.todo("works with negative numbers");

  it.todo("does not use the same index twice ([5], 10 → null)");
});
