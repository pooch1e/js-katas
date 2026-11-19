/**
 * collatzSteps — if n is even, halve it; if odd, make it 3n + 1. Count the
 * steps until n is 1.
 */
import { describe, it, expect } from "vitest";
import { collatzSteps } from "./collatzSteps.js";

describe("collatzSteps", () => {
  it("takes 0 steps from 1", () => {
    expect(collatzSteps(1)).toBe(0);
  });

  it("takes 1 step from 2", () => {
    expect(collatzSteps(2)).toBe(1);
  });

  it("takes 7 steps from 3", () => {
    expect(collatzSteps(3)).toBe(7);
  });

  it("takes 111 steps from 27", () => {
    expect(collatzSteps(27)).toBe(111);
  });

  // Without this guard, collatzSteps(0) loops forever.
  it.todo("throws a RangeError for 0 or negative numbers");
});
