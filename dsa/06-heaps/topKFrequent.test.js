/**
 * topKFrequent(items, k) — the k most frequent items, most frequent first.
 * Ties are broken by whichever value appeared first in items.
 */
import { describe, it, expect } from "vitest";
import { topKFrequent } from "./topKFrequent.js";

describe("topKFrequent", () => {
  it("finds the most frequent numbers", () => {
    expect(topKFrequent([1, 1, 1, 2, 2, 3], 2)).toEqual([1, 2]);
  });

  it("works with strings", () => {
    expect(topKFrequent(["a", "b", "a", "c", "b", "a"], 1)).toEqual(["a"]);
  });

  it("breaks ties by first appearance", () => {
    expect(topKFrequent(["x", "y", "y", "x", "z"], 2)).toEqual(["x", "y"]);
  });

  it.todo("returns every distinct item when k is larger than the number of distinct items");

  it.todo("returns [] when k is 0");
});
