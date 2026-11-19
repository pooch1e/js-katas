/**
 * maxDepth(root) — 0 for null, 1 for a single node.
 */
import { describe, it, expect } from "vitest";
import { maxDepth } from "./maxDepth.js";
import { fromLevelOrder } from "./treeHelpers.js";

describe("maxDepth", () => {
  it("is 0 for an empty tree", () => {
    expect(maxDepth(null)).toBe(0);
  });

  it("measures a balanced tree", () => {
    expect(maxDepth(fromLevelOrder([3, 9, 20, null, null, 15, 7]))).toBe(3);
  });

  it("measures a lopsided tree", () => {
    expect(maxDepth(fromLevelOrder([1, null, 2, null, 3, null, 4]))).toBe(4);
  });

  it.todo("is 1 for a single node");
});
