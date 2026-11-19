/**
 * searchRotated(nums, target) — nums is an ascending array (no duplicates)
 * rotated at some pivot. Index of target or -1, in O(log n).
 */
import { describe, it, expect } from "vitest";
import { searchRotated } from "./searchRotated.js";
import { countingArray } from "./countingArray.js";

describe("searchRotated", () => {
  it("finds a value in the left part", () => {
    expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 5)).toBe(1);
  });

  it("finds a value in the right part", () => {
    expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
  });

  it("returns -1 when missing", () => {
    expect(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
  });

  it("works on an unrotated array", () => {
    expect(searchRotated([1, 2, 3, 4], 3)).toBe(2);
  });

  it("reads O(log n) items", () => {
    const base = Array.from({ length: 1_000_000 }, (_, i) => i);
    const rotated = [...base.slice(700_000), ...base.slice(0, 700_000)];
    const { array, counter } = countingArray(rotated);
    expect(searchRotated(array, 5)).toBe(300_005);
    expect(counter.reads).toBeLessThan(100);
  });

  it.todo("works on one- and two-item arrays");
});
