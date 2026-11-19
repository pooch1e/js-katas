/**
 * bubbleSort(arr, compare?) — O(n²), stable, exits early when a pass makes no swaps.
 */
import { describe, it, expect } from "vitest";
import { bubbleSort } from "./bubbleSort.js";
import { runSortCases } from "./sortCases.js";

runSortCases("bubbleSort", bubbleSort);

describe("bubbleSort", () => {
  it("finishes fast on already-sorted input (early exit)", () => {
    const sorted = Array.from({ length: 200_000 }, (_, i) => i);
    expect(bubbleSort(sorted)[199_999]).toBe(199_999);
  });

  it.todo("is stable: equal keys keep their input order");
});
