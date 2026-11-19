/**
 * subsets(items) — every subset of distinct items, including [] and the full
 * set, in any order. Items within a subset keep their input order.
 */
import { describe, it, expect } from "vitest";
import { subsets } from "./subsets.js";
import { normalise } from "./results.js";

describe("subsets", () => {
  it("returns every subset of three items", () => {
    expect(normalise(subsets([1, 2, 3]))).toEqual(
      normalise([[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]),
    );
  });

  it("returns 2^n subsets", () => {
    expect(subsets([1, 2, 3, 4, 5, 6])).toHaveLength(64);
  });

  it("includes the empty set", () => {
    expect(subsets(["x"])).toContainEqual([]);
  });

  it.todo("returns [[]] for an empty input");

  it.todo("keeps items in input order within each subset");
});
