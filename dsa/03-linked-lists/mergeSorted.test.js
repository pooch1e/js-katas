/**
 * mergeSorted(a, b) — both chains are sorted ascending. Returns the head of
 * a sorted chain made by splicing their nodes together.
 */
import { describe, it, expect } from "vitest";
import { mergeSorted } from "./mergeSorted.js";
import { fromArray, toArray } from "./listHelpers.js";

describe("mergeSorted", () => {
  it("merges two interleaving lists", () => {
    expect(toArray(mergeSorted(fromArray([1, 3, 5]), fromArray([2, 4, 6])))).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("handles one empty list", () => {
    expect(toArray(mergeSorted(null, fromArray([1, 2])))).toEqual([1, 2]);
    expect(toArray(mergeSorted(fromArray([1, 2]), null))).toEqual([1, 2]);
  });

  it("returns null when both are empty", () => {
    expect(mergeSorted(null, null)).toBeNull();
  });

  it("appends the leftover tail of the longer list", () => {
    expect(toArray(mergeSorted(fromArray([1]), fromArray([2, 3, 4])))).toEqual([1, 2, 3, 4]);
  });

  it.todo("keeps duplicates from both lists");

  it.todo("reuses the input nodes instead of creating new ones");
});
