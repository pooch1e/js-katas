/**
 * hasPairWithSum(nums, target) — true if nums[i] + nums[j] === target for some i !== j.
 */
import { describe, it, expect } from "vitest";
import { hasPairWithSum } from "./hasPairWithSum.js";

describe("hasPairWithSum", () => {
  it("finds a pair", () => {
    expect(hasPairWithSum([3, 8, 1, 5], 9)).toBe(true);
  });

  it("returns false when there is no pair", () => {
    expect(hasPairWithSum([1, 2, 4], 10)).toBe(false);
  });

  // 4 + 4 = 8, but there's only one 4.
  it("does not use the same item twice", () => {
    expect(hasPairWithSum([4, 1], 8)).toBe(false);
  });

  it("can use two equal items", () => {
    expect(hasPairWithSum([4, 1, 4], 8)).toBe(true);
  });

  it("is fast on large inputs", () => {
    const big = Array.from({ length: 200_000 }, (_, i) => i * 2);
    expect(hasPairWithSum(big, -1)).toBe(false);
  });

  it.todo("works with negative numbers");
});
