/**
 * new Countdown(from) — iterating yields from, from-1, ..., 1. Each
 * iteration is independent. Use [Symbol.iterator] and next(), not function*.
 */
import { describe, it, expect } from "vitest";
import { Countdown } from "./Countdown.js";

describe("Countdown", () => {
  it("works with spread", () => {
    expect([...new Countdown(3)]).toEqual([3, 2, 1]);
  });

  it("works with for...of", () => {
    const seen = [];
    for (const n of new Countdown(2)) seen.push(n);
    expect(seen).toEqual([2, 1]);
  });

  it("yields nothing from 0", () => {
    expect([...new Countdown(0)]).toEqual([]);
  });

  // If the position lives on the Countdown, the second spread is empty.
  it("can be iterated more than once", () => {
    const c = new Countdown(2);
    expect([...c]).toEqual([2, 1]);
    expect([...c]).toEqual([2, 1]);
  });

  it("returns a real iterator with next()", () => {
    const iter = new Countdown(1)[Symbol.iterator]();
    expect(iter.next()).toEqual({ value: 1, done: false });
    expect(iter.next().done).toBe(true);
  });

  it.todo("works with destructuring: const [first, second] = new Countdown(5)");
});
