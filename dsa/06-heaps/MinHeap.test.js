/**
 * new MinHeap(compare = (a, b) => a - b)
 *   push(v), pop() → smallest (undefined if empty), peek(), size (getter)
 */
import { describe, it, expect } from "vitest";
import { MinHeap } from "./MinHeap.js";

const drain = (h) => {
  const out = [];
  while (h.size) out.push(h.pop());
  return out;
};

describe("MinHeap", () => {
  it("pops values smallest first", () => {
    const h = new MinHeap();
    [5, 3, 8, 1, 9, 2].forEach((v) => h.push(v));
    expect(drain(h)).toEqual([1, 2, 3, 5, 8, 9]);
  });

  it("peeks at the smallest without removing it", () => {
    const h = new MinHeap();
    h.push(4);
    h.push(2);
    expect(h.peek()).toBe(2);
    expect(h.size).toBe(2);
  });

  it("returns undefined from pop and peek when empty", () => {
    const h = new MinHeap();
    expect(h.pop()).toBeUndefined();
    expect(h.peek()).toBeUndefined();
  });

  it("acts as a max-heap with a reversed comparator", () => {
    const h = new MinHeap((a, b) => b - a);
    [5, 3, 8].forEach((v) => h.push(v));
    expect(drain(h)).toEqual([8, 5, 3]);
  });

  it("orders objects with a custom comparator", () => {
    const h = new MinHeap((a, b) => a.priority - b.priority);
    h.push({ task: "eat", priority: 2 });
    h.push({ task: "sleep", priority: 1 });
    expect(h.pop().task).toBe("sleep");
  });

  it("stays fast with many items", () => {
    const h = new MinHeap();
    for (let i = 100_000; i > 0; i--) h.push(i);
    expect(h.pop()).toBe(1);
    expect(h.pop()).toBe(2);
  });

  it.todo("handles duplicate values");

  it.todo("works correctly when pushes and pops are interleaved");
});
