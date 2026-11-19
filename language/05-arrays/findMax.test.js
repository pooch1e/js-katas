/**
 * findMax — returns the largest number, or undefined for an empty array.
 */
import { describe, it, expect } from "vitest";
import { findMax } from "./findMax.js";

describe("findMax", () => {
  it("finds the max in an unsorted array", () => {
    expect(findMax([3, 9, 2, 7])).toBe(9);
  });

  it("finds the max when it is first or last", () => {
    expect(findMax([9, 1, 2])).toBe(9);
    expect(findMax([1, 2, 9])).toBe(9);
  });

  // Starting your running max at 0 fails this one.
  it("works when every number is negative", () => {
    expect(findMax([-5, -2, -9])).toBe(-2);
  });

  it("returns undefined for an empty array", () => {
    expect(findMax([])).toBeUndefined();
  });

  it.todo("does not reorder the input array");
});
