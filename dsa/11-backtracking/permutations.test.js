/**
 * permutations(items) — every ordering of distinct items, in any order.
 */
import { describe, it, expect } from "vitest";
import { permutations } from "./permutations.js";

const asStrings = (perms) => perms.map((p) => p.join("")).sort();

describe("permutations", () => {
  it("returns all orderings of three items", () => {
    expect(asStrings(permutations(["a", "b", "c"]))).toEqual(["abc", "acb", "bac", "bca", "cab", "cba"]);
  });

  it("returns n! results", () => {
    expect(permutations([1, 2, 3, 4, 5])).toHaveLength(120);
  });

  // If every result is [], you pushed the working array instead of a copy.
  it("returns separate arrays, not the same array repeated", () => {
    const perms = permutations([1, 2]);
    expect(perms[0]).not.toBe(perms[1]);
    expect(perms.every((p) => p.length === 2)).toBe(true);
  });

  it.todo("returns [[]] for an empty input");

  it.todo("does not mutate the input");
});
