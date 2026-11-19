/**
 * invertTree(root) — swaps every node's left and right children in place.
 */
import { describe, it, expect } from "vitest";
import { invertTree } from "./invertTree.js";
import { fromLevelOrder, toLevelOrder } from "./treeHelpers.js";

describe("invertTree", () => {
  it("mirrors a full tree", () => {
    expect(toLevelOrder(invertTree(fromLevelOrder([4, 2, 7, 1, 3, 6, 9])))).toEqual([4, 7, 2, 9, 6, 3, 1]);
  });

  it("returns null for an empty tree", () => {
    expect(invertTree(null)).toBeNull();
  });

  it("returns the same root node", () => {
    const root = fromLevelOrder([1, 2]);
    expect(invertTree(root)).toBe(root);
  });

  it.todo("mirrors a tree with missing children ([1, 2, null, 3])");

  it.todo("inverting twice gives back the original shape");
});
