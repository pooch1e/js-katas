/**
 * maxSubarray(nums) — largest sum of a non-empty run of consecutive items.
 * O(n). RangeError for an empty array.
 */
import { describe, it, expect } from "vitest";
import { maxSubarray } from "./maxSubarray.js";

describe("maxSubarray", () => {
  it("finds the classic answer", () => {
    expect(maxSubarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])).toBe(6);
  });

  it("returns the whole sum when everything is positive", () => {
    expect(maxSubarray([1, 2, 3])).toBe(6);
  });

  it("returns the largest item when everything is negative", () => {
    expect(maxSubarray([-3, -1, -2])).toBe(-1);
  });

  it("is O(n)", () => {
    const nums = Array.from({ length: 500_000 }, (_, i) => (i % 2 ? 3 : -2));
    expect(maxSubarray(nums)).toBe(250_002);
  });

  it.todo("throws a RangeError for an empty array");
});
