/**
 * union(a, b)        — every distinct item in a or b (a's order, then b's new ones)
 * intersection(a, b) — distinct items in both (a's order)
 * difference(a, b)   — distinct items in a but not b (a's order)
 */
import { describe, it, expect } from "vitest";
import { union, intersection, difference } from "./setOps.js";

describe("union", () => {
  it("combines without duplicates", () => {
    expect(union([1, 2, 3], [3, 4])).toEqual([1, 2, 3, 4]);
  });

  it("removes duplicates within one input", () => {
    expect(union([1, 1, 2], [])).toEqual([1, 2]);
  });
});

describe("intersection", () => {
  it("keeps items in both", () => {
    expect(intersection([1, 2, 3, 4], [4, 2, 9])).toEqual([2, 4]);
  });

  it("returns [] when nothing overlaps", () => {
    expect(intersection([1, 2], [3])).toEqual([]);
  });

  it.todo("does not repeat items that appear twice in both inputs");
});

describe("difference", () => {
  it("keeps items only in the first", () => {
    expect(difference([1, 2, 3, 4], [2, 4])).toEqual([1, 3]);
  });

  it.todo("returns [] when every item is in the second array");
});
