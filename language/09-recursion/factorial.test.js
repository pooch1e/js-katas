/**
 * factorial(n) — n × (n-1) × ... × 1, with 0! = 1. RangeError for negatives.
 */
import { describe, it, expect } from "vitest";
import { factorial } from "./factorial.js";

describe("factorial", () => {
  it("is 1 for 0 and 1", () => {
    expect(factorial(0)).toBe(1);
    expect(factorial(1)).toBe(1);
  });

  it("computes small factorials", () => {
    expect(factorial(5)).toBe(120);
    expect(factorial(10)).toBe(3628800);
  });

  // Without a guard, this recurses forever and blows the stack.
  it("throws a RangeError for negative numbers", () => {
    expect(() => factorial(-1)).toThrow(RangeError);
  });

  it.todo("computes 3! as 6");
});
