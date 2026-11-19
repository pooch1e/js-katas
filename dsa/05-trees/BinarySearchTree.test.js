/**
 * BinarySearchTree (numbers, no duplicates)
 *   insert(v) — returns the tree; inserting a duplicate does nothing
 *   has(v), delete(v) → true if it was there
 *   min(), max() — undefined when empty
 *   inOrder() — sorted array of values
 *   height() — nodes on the longest root-to-leaf path (0 when empty)
 *   size — getter
 */
import { describe, it, expect } from "vitest";
import { BinarySearchTree } from "./BinarySearchTree.js";

const treeOf = (...values) => {
  const t = new BinarySearchTree();
  values.forEach((v) => t.insert(v));
  return t;
};

describe("BinarySearchTree", () => {
  it("starts empty", () => {
    const t = new BinarySearchTree();
    expect(t.size).toBe(0);
    expect(t.inOrder()).toEqual([]);
    expect(t.height()).toBe(0);
  });

  it("returns values in sorted order", () => {
    expect(treeOf(5, 3, 8, 1, 4, 9).inOrder()).toEqual([1, 3, 4, 5, 8, 9]);
  });

  it("knows what it contains", () => {
    const t = treeOf(5, 3, 8);
    expect(t.has(3)).toBe(true);
    expect(t.has(4)).toBe(false);
  });

  it("finds min and max", () => {
    const t = treeOf(5, 3, 8, 1, 9);
    expect(t.min()).toBe(1);
    expect(t.max()).toBe(9);
  });

  it("ignores duplicate inserts", () => {
    expect(treeOf(2, 2, 2).size).toBe(1);
  });

  it("measures height", () => {
    expect(treeOf(5, 3, 8).height()).toBe(2);
    expect(treeOf(1, 2, 3, 4).height()).toBe(4);
  });

  it("deletes a leaf", () => {
    const t = treeOf(5, 3, 8);
    expect(t.delete(3)).toBe(true);
    expect(t.inOrder()).toEqual([5, 8]);
    expect(t.size).toBe(2);
  });

  it("deletes a node with one child", () => {
    const t = treeOf(5, 3, 1);
    t.delete(3);
    expect(t.inOrder()).toEqual([1, 5]);
  });

  // The in-order successor takes the deleted node's place.
  it("deletes a node with two children", () => {
    const t = treeOf(5, 3, 8, 7, 9, 6);
    t.delete(8);
    expect(t.inOrder()).toEqual([3, 5, 6, 7, 9]);
  });

  it.todo("deletes the root, including when it is the only node");

  it.todo("returns false when deleting a missing value, leaving size unchanged");

  it.todo("returns undefined from min() and max() when empty");
});
