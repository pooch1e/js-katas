/**
 * filter(arr, fn) — new array of items for which fn(item, index, arr) is truthy.
 */
import { describe, it, expect } from "vitest";
import { filter } from "./filter.js";

describe("filter", () => {
  it("keeps items that pass the test", () => {
    expect(filter([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([2, 4]);
  });

  it("returns an empty array when nothing passes", () => {
    expect(filter([1, 3], (n) => n > 10)).toEqual([]);
  });

  it("passes the index", () => {
    expect(filter(["a", "b", "c"], (_, i) => i !== 1)).toEqual(["a", "c"]);
  });

  // The callback doesn't have to return exactly true. Any truthy value counts.
  it("treats any truthy return value as a pass", () => {
    expect(filter(["", "x", "", "y"], (s) => s)).toEqual(["x", "y"]);
  });

  it.todo("does not mutate the input");
});
