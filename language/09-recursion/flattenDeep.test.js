/**
 * flattenDeep — flattens any depth of nested arrays into one array, in order.
 */
import { describe, it, expect } from "vitest";
import { flattenDeep } from "./flattenDeep.js";

describe("flattenDeep", () => {
  it("returns a flat array unchanged", () => {
    expect(flattenDeep([1, 2, 3])).toEqual([1, 2, 3]);
  });

  it("flattens deep nesting in order", () => {
    expect(flattenDeep([1, [2, [3, [4, [5]]]], 6])).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("drops empty arrays", () => {
    expect(flattenDeep([[], [1, []], [[2]]])).toEqual([1, 2]);
  });

  it("keeps non-number items", () => {
    expect(flattenDeep(["a", ["b", [{ c: 1 }]]])).toEqual(["a", "b", { c: 1 }]);
  });

  it.todo("does not mutate the input");
});
