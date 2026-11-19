/**
 * new Counter(start = 0) — increment()/decrement() return the counter;
 * count is a read-only getter backed by a #private field. The count never
 * goes below 0 (decrement at 0 does nothing).
 */
import { describe, it, expect } from "vitest";
import { Counter } from "./Counter.js";

describe("Counter", () => {
  it("counts up and down with chaining", () => {
    const c = new Counter();
    c.increment().increment().decrement();
    expect(c.count).toBe(1);
  });

  it("starts from a given value", () => {
    expect(new Counter(5).count).toBe(5);
  });

  it("never goes below zero", () => {
    const c = new Counter(0);
    c.decrement();
    expect(c.count).toBe(0);
  });

  it("has no public fields", () => {
    expect(Object.keys(new Counter(3))).toEqual([]);
    expect(JSON.stringify(new Counter(3))).toBe("{}");
  });

  it.todo("throws a TypeError when assigning to count");

  it.todo("keeps instances independent");
});
