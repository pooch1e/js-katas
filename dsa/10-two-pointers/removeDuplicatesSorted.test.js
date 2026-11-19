/**
 * removeDuplicatesSorted(nums) — mutates nums so its first k items are the
 * unique values in order, and returns k. What's after index k doesn't
 * matter. No new arrays, Sets or splice.
 */
import { describe, it, expect } from "vitest";
import { removeDuplicatesSorted } from "./removeDuplicatesSorted.js";

describe("removeDuplicatesSorted", () => {
  it("returns the count of unique values", () => {
    expect(removeDuplicatesSorted([1, 1, 2])).toBe(2);
  });

  it("moves the unique values to the front", () => {
    const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
    const k = removeDuplicatesSorted(nums);
    expect(nums.slice(0, k)).toEqual([0, 1, 2, 3, 4]);
  });

  it("returns 0 for an empty array", () => {
    expect(removeDuplicatesSorted([])).toBe(0);
  });

  it.todo("leaves an array without duplicates unchanged");

  it.todo("works on a huge array of one repeated value in O(n)");
});
