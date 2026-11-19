/**
 * middleNode(head) — returns the middle node. For even lengths, the second
 * of the two middles. null for an empty list. One pass, no arrays.
 */
import { describe, it, expect } from "vitest";
import { middleNode } from "./middleNode.js";
import { fromArray } from "./listHelpers.js";

describe("middleNode", () => {
  it("finds the middle of an odd-length list", () => {
    expect(middleNode(fromArray([1, 2, 3, 4, 5])).value).toBe(3);
  });

  it("returns the second middle for an even-length list", () => {
    expect(middleNode(fromArray([1, 2, 3, 4])).value).toBe(3);
  });

  it("returns null for an empty list", () => {
    expect(middleNode(null)).toBeNull();
  });

  it.todo("returns the only node for a one-node list");

  it.todo("returns the second node for a two-node list");
});
