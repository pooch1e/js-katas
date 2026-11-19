/**
 * reverseList(head) — reverses the chain by rewiring next pointers. No new
 * nodes and no arrays. Returns the new head.
 */
import { describe, it, expect } from "vitest";
import { reverseList } from "./reverseList.js";
import { fromArray, toArray } from "./listHelpers.js";

describe("reverseList", () => {
  it("reverses a list", () => {
    expect(toArray(reverseList(fromArray([1, 2, 3, 4])))).toEqual([4, 3, 2, 1]);
  });

  it("returns null for an empty list", () => {
    expect(reverseList(null)).toBeNull();
  });

  it("reuses the same nodes instead of creating new ones", () => {
    const head = fromArray([1, 2, 3]);
    const oldTail = head.next.next;
    expect(reverseList(head)).toBe(oldTail);
  });

  it.todo("returns a single node unchanged with next still null");

  // Stretch: write a recursive version too.
  it.todo("leaves the old head pointing at null");
});
