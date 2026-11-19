/**
 * sum — variadic addition using rest parameters.
 */
import { describe, it, expect } from "vitest";
import { sum } from "./sum.js";

describe("sum", () => {
  it("adds two numbers", () => {
    expect(sum(1, 2)).toBe(3);
  });

  it("adds many numbers", () => {
    expect(sum(1, 2, 3, 4, 5)).toBe(15);
  });

  it("returns 0 with no arguments", () => {
    expect(sum()).toBe(0);
  });

  it("works when called with a spread array", () => {
    const nums = [10, 20, 30];
    expect(sum(...nums)).toBe(60);
  });

  it.todo("returns the number itself for a single argument");
});
