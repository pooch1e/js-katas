/**
 * mergeSort(arr, compare?) — O(n log n), stable.
 */
import { describe, it, expect } from "vitest";
import { mergeSort } from "./mergeSort.js";
import { runSortCases } from "./sortCases.js";

runSortCases("mergeSort", mergeSort);

describe("mergeSort", () => {
  it("sorts a large random array quickly", () => {
    const big = Array.from({ length: 200_000 }, (_, i) => (i * 7919) % 200_003);
    const result = mergeSort(big);
    for (let i = 1; i < result.length; i++) expect(result[i - 1] <= result[i]).toBe(true);
  });

  it("is stable: equal keys keep their input order", () => {
    const people = [
      { name: "a", age: 30 },
      { name: "b", age: 20 },
      { name: "c", age: 30 },
      { name: "d", age: 20 },
    ];
    expect(mergeSort(people, (x, y) => x.age - y.age).map((p) => p.name)).toEqual(["b", "d", "a", "c"]);
  });

  it.todo("sorts an array in reverse order");
});
