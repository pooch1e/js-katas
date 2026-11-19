/**
 * countTruthy — counts the truthy values in an array.
 */
import { describe, it, expect } from "vitest";
import { countTruthy } from "./countTruthy.js";

describe("countTruthy", () => {
  it("returns 0 for an empty array", () => {
    expect(countTruthy([])).toBe(0);
  });

  it("counts all of them when all are truthy", () => {
    expect(countTruthy([1, "a", true])).toBe(3);
  });

  it("returns 0 when every value is falsy", () => {
    expect(countTruthy([false, 0, "", null, undefined, NaN])).toBe(0);
  });

  // Predict the answer before you run it.
  it("treats '0', 'false', [] and {} as truthy", () => {
    expect(countTruthy(["0", "false", [], {}])).toBe(4);
  });

  it.todo("counts a mix of truthy and falsy values");
});
