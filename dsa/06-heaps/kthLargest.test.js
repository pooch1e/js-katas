/**
 * kthLargest(nums, k) — uses a size-k min-heap. Duplicates count separately.
 * Throws a RangeError if k is outside 1..nums.length.
 */
import { describe, it, expect } from "vitest";
import { kthLargest } from "./kthLargest.js";

describe("kthLargest", () => {
  it("finds the 2nd largest", () => {
    expect(kthLargest([3, 2, 1, 5, 6, 4], 2)).toBe(5);
  });

  it("counts duplicates separately", () => {
    expect(kthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)).toBe(4);
  });

  it("finds the max when k is 1", () => {
    expect(kthLargest([1, 9, 3], 1)).toBe(9);
  });

  it("throws a RangeError when k is too large", () => {
    expect(() => kthLargest([1, 2], 3)).toThrow(RangeError);
  });

  it.todo("finds the min when k equals the length");

  it.todo("does not mutate nums");
});
