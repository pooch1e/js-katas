/**
 * twoSum(nums, target) — [i, j] with i < j and nums[i] + nums[j] === target,
 * or null. If several pairs work, return the one whose j is smallest.
 */
import { describe, it, expect } from "vitest";
import { twoSum } from "./twoSum.js";

describe("twoSum", () => {
  it("finds the pair's indexes", () => {
    expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
  });

  it("finds pairs that aren't adjacent", () => {
    expect(twoSum([3, 2, 4], 6)).toEqual([1, 2]);
  });

  it("can use two equal values", () => {
    expect(twoSum([3, 3], 6)).toEqual([0, 1]);
  });

  it("returns null when there is no pair", () => {
    expect(twoSum([1, 2], 10)).toBeNull();
  });

  it("is O(n)", () => {
    const nums = Array.from({ length: 200_000 }, (_, i) => i);
    expect(twoSum(nums, 399_997)).toEqual([199_998, 199_999]);
  });

  it.todo("works with negative numbers");
});
