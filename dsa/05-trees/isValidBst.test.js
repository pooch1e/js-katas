/**
 * isValidBst(root) — every node's left subtree holds only smaller values and
 * its right subtree only larger. Equal values are invalid. null is valid.
 */
import { describe, it, expect } from "vitest";
import { isValidBst } from "./isValidBst.js";
import { fromLevelOrder } from "./treeHelpers.js";

describe("isValidBst", () => {
  it("accepts a valid BST", () => {
    expect(isValidBst(fromLevelOrder([2, 1, 3]))).toBe(true);
  });

  it("rejects a child on the wrong side", () => {
    expect(isValidBst(fromLevelOrder([2, 3, 1]))).toBe(false);
  });

  // 3 is a valid child of 4, but it sits in 5's right subtree, so it must be > 5.
  it("rejects a grandchild that breaks an ancestor's rule", () => {
    expect(isValidBst(fromLevelOrder([5, 1, 4, null, null, 3, 6]))).toBe(false);
  });

  it("accepts an empty tree", () => {
    expect(isValidBst(null)).toBe(true);
  });

  it.todo("rejects duplicate values ([2, 2, 2])");

  it.todo("accepts a single node");
});
