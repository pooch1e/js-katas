/**
 * Stack — push(v) returns the new size; pop()/peek() return undefined when
 * empty; size is a getter; isEmpty() is a method.
 */
import { describe, it, expect } from "vitest";
import { Stack } from "./Stack.js";

describe("Stack", () => {
  it("starts empty", () => {
    const s = new Stack();
    expect(s.size).toBe(0);
    expect(s.isEmpty()).toBe(true);
  });

  it("pops in reverse order of pushes", () => {
    const s = new Stack();
    s.push(1);
    s.push(2);
    s.push(3);
    expect([s.pop(), s.pop(), s.pop()]).toEqual([3, 2, 1]);
  });

  it("peeks without removing", () => {
    const s = new Stack();
    s.push("a");
    expect(s.peek()).toBe("a");
    expect(s.size).toBe(1);
  });

  it("returns undefined from pop and peek when empty", () => {
    const s = new Stack();
    expect(s.pop()).toBeUndefined();
    expect(s.peek()).toBeUndefined();
  });

  it.todo("returns the new size from push");

  it.todo("does not expose its storage (Object.keys(stack) is empty)");
});
