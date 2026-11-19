/**
 * MinStack — push, pop, peek, and min() returning the smallest value
 * currently in the stack (undefined if empty), all in O(1).
 */
import { describe, it, expect } from "vitest";
import { MinStack } from "./MinStack.js";

describe("MinStack", () => {
  it("tracks the min as values are pushed", () => {
    const s = new MinStack();
    s.push(5);
    expect(s.min()).toBe(5);
    s.push(3);
    expect(s.min()).toBe(3);
    s.push(7);
    expect(s.min()).toBe(3);
  });

  it("restores the previous min after popping", () => {
    const s = new MinStack();
    s.push(5);
    s.push(2);
    s.pop();
    expect(s.min()).toBe(5);
  });

  // Push 2, push 2, pop. Is the min still 2?
  it("handles duplicate minimums", () => {
    const s = new MinStack();
    s.push(2);
    s.push(2);
    s.pop();
    expect(s.min()).toBe(2);
  });

  it("is fast with many values", () => {
    const s = new MinStack();
    for (let i = 100_000; i > 0; i--) s.push(i);
    for (let i = 0; i < 100_000; i++) s.min();
    expect(s.min()).toBe(1);
  });

  it.todo("returns undefined from min() when empty");

  it.todo("pop and peek behave like a normal stack");
});
