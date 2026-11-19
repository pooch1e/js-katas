/**
 * mergeKSorted(lists) — each list is sorted ascending. Returns one sorted
 * array in O(n log k). Don't concatenate and sort.
 */
import { describe, it, expect } from "vitest";
import { mergeKSorted } from "./mergeKSorted.js";

describe("mergeKSorted", () => {
  it("merges three lists", () => {
    expect(mergeKSorted([[1, 4, 5], [1, 3, 4], [2, 6]])).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
  });

  it("skips empty lists", () => {
    expect(mergeKSorted([[], [1], []])).toEqual([1]);
  });

  it("returns [] for no lists", () => {
    expect(mergeKSorted([])).toEqual([]);
  });

  it.todo("returns a single list as a copy");

  it.todo("handles lists of very different lengths");
});
