/**
 * searchInsert(sorted, target) — index of target if present; otherwise the
 * index where inserting it would keep the array sorted.
 */
import { describe, it, expect } from "vitest";
import { searchInsert } from "./searchInsert.js";

describe("searchInsert", () => {
  it("returns the index of a present value", () => {
    expect(searchInsert([1, 3, 5, 6], 5)).toBe(2);
  });

  it("returns the insert position for a missing value", () => {
    expect(searchInsert([1, 3, 5, 6], 2)).toBe(1);
  });

  it("can insert past the end", () => {
    expect(searchInsert([1, 3, 5, 6], 7)).toBe(4);
  });

  it.todo("can insert at the front");

  it.todo("returns 0 for an empty array");
});
