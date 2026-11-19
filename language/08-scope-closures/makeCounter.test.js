/**
 * makeCounter(start = 0) — returns an object of functions:
 *   increment() → new value, decrement() → new value,
 *   reset() → back to start, value() → current value.
 */
import { describe, it, expect } from "vitest";
import { makeCounter } from "./makeCounter.js";

describe("makeCounter", () => {
  it("starts at 0 by default", () => {
    expect(makeCounter().value()).toBe(0);
  });

  it("increments and returns the new value", () => {
    const c = makeCounter();
    expect(c.increment()).toBe(1);
    expect(c.increment()).toBe(2);
    expect(c.value()).toBe(2);
  });

  it("decrements", () => {
    const c = makeCounter(5);
    expect(c.decrement()).toBe(4);
  });

  it("resets to the starting value", () => {
    const c = makeCounter(10);
    c.increment();
    c.increment();
    c.reset();
    expect(c.value()).toBe(10);
  });

  it("keeps separate counters independent", () => {
    const a = makeCounter();
    const b = makeCounter();
    a.increment();
    expect(b.value()).toBe(0);
  });

  it.todo("does not expose the count as a property (Object.keys only lists the four functions)");
});
