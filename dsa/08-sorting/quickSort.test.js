/**
 * quickSort(arr, compare?) — O(n log n) on average. Pick your pivot so sorted
 * input doesn't go quadratic.
 */
import { describe, it, expect } from "vitest";
import { quickSort } from "./quickSort.js";
import { runSortCases } from "./sortCases.js";

runSortCases("quickSort", quickSort);

describe("quickSort", () => {
  it("sorts a large random array quickly", () => {
    const big = Array.from({ length: 200_000 }, (_, i) => (i * 7919) % 200_003);
    const result = quickSort(big);
    for (let i = 1; i < result.length; i++) expect(result[i - 1] <= result[i]).toBe(true);
  });

  // A first-item pivot makes this O(n²), and the recursion may even overflow the stack.
  it("does not go quadratic on already-sorted input", () => {
    const sorted = Array.from({ length: 100_000 }, (_, i) => i);
    expect(quickSort(sorted)[99_999]).toBe(99_999);
  });

  it.todo("handles many duplicates (an array of 100,000 sevens)");
});
