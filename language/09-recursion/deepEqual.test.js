/**
 * deepEqual(a, b) — true if a and b have the same structure and values.
 */
import { describe, it, expect } from "vitest";
import { deepEqual } from "./deepEqual.js";

describe("deepEqual", () => {
  it("compares primitives with ===", () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual(1, "1")).toBe(false);
  });

  it("compares flat objects by content", () => {
    expect(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(deepEqual({ a: 1 }, { a: 2 })).toBe(false);
  });

  it("notices extra keys on either side", () => {
    expect(deepEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
    expect(deepEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
  });

  it("compares nested structures", () => {
    expect(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 2 }] })).toBe(true);
    expect(deepEqual({ a: [1, { b: 2 }] }, { a: [1, { b: 3 }] })).toBe(false);
  });

  it("cares about array order", () => {
    expect(deepEqual([1, 2], [2, 1])).toBe(false);
  });

  // typeof null is "object". Make sure deepEqual(null, {}) doesn't crash.
  it("handles null", () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(null, {})).toBe(false);
  });

  it.todo("says an array is not equal to an object with the same indexes as keys");
});
