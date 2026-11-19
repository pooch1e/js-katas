/**
 * sumMultiples — sum of every number below limit (not including it) that is
 * divisible by 3 or 5.
 */
import { describe, it, expect } from "vitest";
import { sumMultiples } from "./sumMultiples.js";

describe("sumMultiples", () => {
  it("sums 3, 5, 6 and 9 below 10", () => {
    expect(sumMultiples(10)).toBe(23);
  });

  it("does not include the limit itself", () => {
    expect(sumMultiples(6)).toBe(8);
  });

  it("counts 15 only once even though it is divisible by both", () => {
    expect(sumMultiples(16)).toBe(60);
  });

  it.todo("returns 0 when the limit is 3 or less");
});
