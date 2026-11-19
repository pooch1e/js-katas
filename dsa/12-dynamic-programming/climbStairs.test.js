/**
 * climbStairs(n) — number of distinct ways to climb n steps with moves of 1 or 2.
 */
import { describe, it, expect } from "vitest";
import { climbStairs } from "./climbStairs.js";

describe("climbStairs", () => {
  it("has 1 way to climb 1 step", () => {
    expect(climbStairs(1)).toBe(1);
  });

  it("has 2 ways to climb 2 steps", () => {
    expect(climbStairs(2)).toBe(2);
  });

  it("has 8 ways to climb 5 steps", () => {
    expect(climbStairs(5)).toBe(8);
  });

  // Plain recursion makes ~2^n calls. This needs memoisation or a table.
  it("handles 80 steps quickly", () => {
    expect(climbStairs(80)).toBe(37889062373143906);
  });

  it.todo("has 1 way to climb 0 steps (do nothing)");

  // Stretch: what if allowed moves are passed in, e.g. climbStairs(n, [1, 3, 5])?
  it.todo("works with custom step sizes");
});
