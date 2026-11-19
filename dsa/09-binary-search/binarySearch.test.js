/**
 * binarySearch(sorted, target) — sorted ascending, no duplicates. Index or -1.
 */
import { describe, it, expect } from "vitest";
import { binarySearch } from "./binarySearch.js";
import { countingArray } from "./countingArray.js";

describe("binarySearch", () => {
  it("finds a value in the middle", () => {
    expect(binarySearch([1, 3, 5, 7, 9], 5)).toBe(2);
  });

  it("finds the first and last values", () => {
    expect(binarySearch([1, 3, 5, 7, 9], 1)).toBe(0);
    expect(binarySearch([1, 3, 5, 7, 9], 9)).toBe(4);
  });

  it("returns -1 when missing", () => {
    expect(binarySearch([1, 3, 5], 4)).toBe(-1);
    expect(binarySearch([1, 3, 5], 0)).toBe(-1);
    expect(binarySearch([1, 3, 5], 10)).toBe(-1);
  });

  it("returns -1 for an empty array", () => {
    expect(binarySearch([], 1)).toBe(-1);
  });

  it("reads O(log n) items", () => {
    const { array, counter } = countingArray(Array.from({ length: 1_000_000 }, (_, i) => i * 2));
    expect(binarySearch(array, 1_234_566)).toBe(617_283);
    expect(counter.reads).toBeLessThan(45);
  });

  it.todo("works on a two-item array for both items and a missing one");
});
