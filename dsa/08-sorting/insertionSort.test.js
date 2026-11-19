/**
 * insertionSort(arr, compare?) — O(n²) in general, near O(n) on nearly sorted input. Stable.
 */
import { describe, it, expect } from "vitest";
import { insertionSort } from "./insertionSort.js";
import { runSortCases } from "./sortCases.js";

runSortCases("insertionSort", insertionSort);

describe("insertionSort", () => {
  it("is fast on nearly sorted input", () => {
    const nearly = Array.from({ length: 200_000 }, (_, i) => i);
    [nearly[10], nearly[11]] = [nearly[11], nearly[10]];
    expect(insertionSort(nearly).slice(9, 13)).toEqual([9, 10, 11, 12]);
  });

  it.todo("is stable: equal keys keep their input order");
});
