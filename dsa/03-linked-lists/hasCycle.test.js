/**
 * hasCycle(head) — true if following next pointers ever revisits a node.
 */
import { describe, it, expect } from "vitest";
import { hasCycle } from "./hasCycle.js";
import { fromArray } from "./listHelpers.js";

const withCycle = (values, joinAt) => {
  const head = fromArray(values);
  let tail = head;
  while (tail.next) tail = tail.next;
  let join = head;
  for (let i = 0; i < joinAt; i++) join = join.next;
  tail.next = join;
  return head;
};

describe("hasCycle", () => {
  it("is false for a straight list", () => {
    expect(hasCycle(fromArray([1, 2, 3]))).toBe(false);
  });

  it("is false for an empty list", () => {
    expect(hasCycle(null)).toBe(false);
  });

  it("finds a cycle back to the head", () => {
    expect(hasCycle(withCycle([1, 2, 3], 0))).toBe(true);
  });

  it("finds a cycle that starts partway along", () => {
    expect(hasCycle(withCycle([1, 2, 3, 4, 5], 2))).toBe(true);
  });

  // Two nodes can hold equal values without being the same node.
  it.todo("is false for a list with repeated values but no cycle");

  it.todo("finds a single node pointing at itself");
});
