/**
 * longestConsecutive(nums) — unsorted input; the length of the longest set
 * of values forming n, n+1, n+2, ... Must be O(n): don't sort.
 */
import { describe, it, expect } from "vitest";
import { longestConsecutive } from "./longestConsecutive.js";

describe("longestConsecutive", () => {
  it("finds the longest run", () => {
    expect(longestConsecutive([100, 4, 200, 1, 3, 2])).toBe(4);
  });

  it("ignores duplicates", () => {
    expect(longestConsecutive([1, 2, 2, 3])).toBe(3);
  });

  it("returns 0 for an empty array", () => {
    expect(longestConsecutive([])).toBe(0);
  });

  it("is O(n) on a big shuffled range", () => {
    const nums = Array.from({ length: 200_000 }, (_, i) => (i * 7919) % 200_000);
    expect(longestConsecutive(nums)).toBe(200_000);
  });

  it.todo("works with negative numbers ([-1, 0, 1] → 3)");

  it.todo("returns 1 when nothing is consecutive");
});
