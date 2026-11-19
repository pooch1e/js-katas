/**
 * clamp — returns min if n is below it, max if above it, otherwise n.
 * Throws a RangeError if min > max.
 */
import { describe, it, expect } from "vitest";
import { clamp } from "./clamp.js";

describe("clamp", () => {
  it("returns n when it is within range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("raises n to min", () => {
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it("lowers n to max", () => {
    expect(clamp(42, 0, 10)).toBe(10);
  });

  it("returns the boundaries themselves unchanged", () => {
    expect(clamp(0, 0, 10)).toBe(0);
    expect(clamp(10, 0, 10)).toBe(10);
  });

  it("throws a RangeError when min is greater than max", () => {
    expect(() => clamp(5, 10, 0)).toThrow(RangeError);
  });

  it.todo("works when min equals max");
});
