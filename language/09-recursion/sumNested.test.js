/**
 * sumNested — [1, [2, [3, [4]]]] → 10.
 */
import { describe, it, expect } from "vitest";
import { sumNested } from "./sumNested.js";

describe("sumNested", () => {
  it("sums a flat array", () => {
    expect(sumNested([1, 2, 3])).toBe(6);
  });

  it("sums one level of nesting", () => {
    expect(sumNested([1, [2, 3]])).toBe(6);
  });

  it("sums deep nesting", () => {
    expect(sumNested([1, [2, [3, [4]]]])).toBe(10);
  });

  it("treats empty arrays as 0", () => {
    expect(sumNested([[], [[]], 5])).toBe(5);
  });

  it.todo("returns 0 for an empty array");
});
