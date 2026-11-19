/**
 * combinationSum(candidates, target) — distinct positive candidates; each
 * may be used any number of times. Returns every unique combination
 * (as ascending arrays) that sums to target, in any order.
 */
import { describe, it, expect } from "vitest";
import { combinationSum } from "./combinationSum.js";
import { normalise } from "./results.js";

describe("combinationSum", () => {
  it("finds combinations with reuse", () => {
    expect(normalise(combinationSum([2, 3, 6, 7], 7))).toEqual(normalise([[2, 2, 3], [7]]));
  });

  it("finds several combinations", () => {
    expect(normalise(combinationSum([2, 3, 5], 8))).toEqual(normalise([[2, 2, 2, 2], [2, 3, 3], [3, 5]]));
  });

  // [2, 3, 3] and [3, 2, 3] are the same combination.
  it("does not return reorderings of the same combination", () => {
    const result = combinationSum([2, 3], 8);
    expect(result).toHaveLength(normalise(result).filter((v, i, a) => a.indexOf(v) === i).length);
  });

  it("returns [] when nothing works", () => {
    expect(combinationSum([4, 6], 5)).toEqual([]);
  });

  it.todo("returns each combination sorted ascending");

  it.todo("works when candidates are given unsorted");
});
