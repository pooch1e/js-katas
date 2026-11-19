/**
 * bindAll(obj) — replaces each function-valued own property with a version
 * bound to obj. Mutates obj and returns it. Non-function properties are untouched.
 */
import { describe, it, expect } from "vitest";
import { bindAll } from "./bindAll.js";

const makeCounter = () => ({
  count: 0,
  increment() {
    this.count++;
    return this.count;
  },
  label() {
    return `count: ${this.count}`;
  },
});

describe("bindAll", () => {
  it("returns the same object", () => {
    const c = makeCounter();
    expect(bindAll(c)).toBe(c);
  });

  it("makes detached methods work", () => {
    const c = bindAll(makeCounter());
    const { increment } = c;
    increment();
    increment();
    expect(c.count).toBe(2);
  });

  it("works when a method is passed as a callback", () => {
    const c = bindAll(makeCounter());
    [1, 2, 3].forEach(c.increment);
    expect(c.label()).toBe("count: 3");
  });

  it("leaves non-function properties alone", () => {
    const c = bindAll(makeCounter());
    expect(c.count).toBe(0);
  });

  it.todo("does not affect other objects made by the same factory");
});
