/**
 * range(start, end, step = 1) — yields from start up to (not including)
 * end. Negative steps count down. A step of 0 throws a RangeError.
 */
import { describe, it, expect } from "vitest";
import { range } from "./range.js";

describe("range", () => {
  it("yields start up to end, excluding end", () => {
    expect([...range(0, 5)]).toEqual([0, 1, 2, 3, 4]);
  });

  it("supports a custom step", () => {
    expect([...range(0, 10, 3)]).toEqual([0, 3, 6, 9]);
  });

  it("counts down with a negative step", () => {
    expect([...range(5, 0, -2)]).toEqual([5, 3, 1]);
  });

  it("yields nothing when start equals end", () => {
    expect([...range(3, 3)]).toEqual([]);
  });

  it("is lazy: you can pull one value at a time", () => {
    const it = range(10, 20);
    expect(it.next()).toEqual({ value: 10, done: false });
    expect(it.next()).toEqual({ value: 11, done: false });
  });

  // A generator body doesn't run until the first next(), so a throw only appears then.
  it.todo("throws a RangeError for a step of 0 (when you start iterating)");
});
