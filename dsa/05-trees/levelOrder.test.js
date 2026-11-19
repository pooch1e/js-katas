/**
 * levelOrder(root) — [[root], [level 1 left→right], ...]; [] for null.
 */
import { describe, it, expect } from "vitest";
import { levelOrder } from "./levelOrder.js";
import { fromLevelOrder } from "./treeHelpers.js";

describe("levelOrder", () => {
  it("groups values by level", () => {
    expect(levelOrder(fromLevelOrder([3, 9, 20, null, null, 15, 7]))).toEqual([[3], [9, 20], [15, 7]]);
  });

  it("returns [] for an empty tree", () => {
    expect(levelOrder(null)).toEqual([]);
  });

  it("handles gaps in a level", () => {
    expect(levelOrder(fromLevelOrder([1, 2, 3, null, 4, null, 5]))).toEqual([[1], [2, 3], [4, 5]]);
  });

  it.todo("returns [[x]] for a single node");

  // Build one with fromLevelOrder([1, 2, null, 3, null, 4, null, 5]).
  it.todo("works on a 5-level lopsided tree");
});
