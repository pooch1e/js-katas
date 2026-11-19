/**
 * sqrtFloor(x) — largest integer m with m * m <= x, for integer x >= 0.
 * Don't use Math.sqrt or **.
 */
import { describe, it, expect } from "vitest";
import { sqrtFloor } from "./sqrtFloor.js";

describe("sqrtFloor", () => {
  it("handles perfect squares", () => {
    expect(sqrtFloor(16)).toBe(4);
    expect(sqrtFloor(1)).toBe(1);
  });

  it("rounds down for non-squares", () => {
    expect(sqrtFloor(8)).toBe(2);
    expect(sqrtFloor(99)).toBe(9);
  });

  it("handles 0", () => {
    expect(sqrtFloor(0)).toBe(0);
  });

  it("handles large numbers quickly", () => {
    expect(sqrtFloor(2_147_395_599)).toBe(46_339);
  });

  it.todo("throws a RangeError for negative input");
});
