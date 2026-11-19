/**
 * maxSumSubarray(nums, k) — max sum of a window of exactly k consecutive
 * items. RangeError if k < 1 or k > nums.length.
 */
import { describe, it, expect } from "vitest";
import { maxSumSubarray } from "./maxSumSubarray.js";

describe("maxSumSubarray", () => {
  it("finds the best window", () => {
    expect(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)).toBe(9);
  });

  it("handles k equal to the length", () => {
    expect(maxSumSubarray([1, 2, 3], 3)).toBe(6);
  });

  it("works when every number is negative", () => {
    expect(maxSumSubarray([-5, -1, -3, -2], 2)).toBe(-4);
  });

  it("throws a RangeError for an impossible k", () => {
    expect(() => maxSumSubarray([1, 2], 3)).toThrow(RangeError);
  });

  // Re-summing each window is O(n·k). Here that's 10^10 operations.
  it("is O(n) with a big window", () => {
    const nums = Array.from({ length: 200_000 }, (_, i) => i % 10);
    expect(maxSumSubarray(nums, 100_000)).toBe(450_000);
  });

  it.todo("returns the max item when k is 1");
});
