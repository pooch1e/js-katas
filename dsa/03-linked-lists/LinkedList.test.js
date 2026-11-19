/**
 * LinkedList
 *   append(v), prepend(v) — return the list (chainable)
 *   at(i)          — value at index, undefined if out of range
 *   removeAt(i)    — removes and returns the value; RangeError if out of range
 *   indexOf(v)     — first index of v, or -1
 *   size           — getter
 *   toArray(), and iterable with for...of
 */
import { describe, it, expect } from "vitest";
import { LinkedList } from "./LinkedList.js";

const listOf = (...values) => {
  const l = new LinkedList();
  values.forEach((v) => l.append(v));
  return l;
};

describe("LinkedList", () => {
  it("starts empty", () => {
    const l = new LinkedList();
    expect(l.size).toBe(0);
    expect(l.toArray()).toEqual([]);
  });

  it("appends to the end and prepends to the front", () => {
    const l = new LinkedList();
    l.append(2).append(3).prepend(1);
    expect(l.toArray()).toEqual([1, 2, 3]);
    expect(l.size).toBe(3);
  });

  it("reads by index", () => {
    const l = listOf("a", "b", "c");
    expect(l.at(0)).toBe("a");
    expect(l.at(2)).toBe("c");
    expect(l.at(3)).toBeUndefined();
  });

  it("removes from the middle", () => {
    const l = listOf(1, 2, 3);
    expect(l.removeAt(1)).toBe(2);
    expect(l.toArray()).toEqual([1, 3]);
    expect(l.size).toBe(2);
  });

  it("removes the head", () => {
    const l = listOf(1, 2);
    l.removeAt(0);
    expect(l.toArray()).toEqual([2]);
  });

  // The bug: removing the last node but leaving tail pointing at it.
  it("keeps append working after removing the tail", () => {
    const l = listOf(1, 2, 3);
    l.removeAt(2);
    l.append(4);
    expect(l.toArray()).toEqual([1, 2, 4]);
  });

  it("throws a RangeError when removing out of range", () => {
    expect(() => listOf(1).removeAt(5)).toThrow(RangeError);
  });

  it.todo("finds indexOf a value, or -1");

  it.todo("is iterable with for...of and spread");

  it.todo("handles removing the only item, then appending again");

  it.todo("appends in O(1): 100,000 appends finish quickly");
});
