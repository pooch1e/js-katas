/**
 * Shared tests that every sort in this module must pass. Each sort's test
 * file calls runSortCases(name, sortFn). Already written; read, don't edit.
 */
import { describe, it, expect } from "vitest";

export function runSortCases(name, sort) {
  describe(`${name}: shared cases`, () => {
    it("sorts numbers ascending by default", () => {
      expect(sort([5, 2, 9, 1, 5, 6])).toEqual([1, 2, 5, 5, 6, 9]);
    });

    it("compares numbers as numbers, not strings", () => {
      expect(sort([10, 9, 100, 1])).toEqual([1, 9, 10, 100]);
    });

    it("handles empty and single-item arrays", () => {
      expect(sort([])).toEqual([]);
      expect(sort([1])).toEqual([1]);
    });

    it("accepts a comparator", () => {
      expect(sort([1, 3, 2], (a, b) => b - a)).toEqual([3, 2, 1]);
      expect(sort(["pear", "fig", "apple"], (a, b) => a.localeCompare(b))).toEqual(["apple", "fig", "pear"]);
    });

    it("returns a new array and leaves the input alone", () => {
      const input = [3, 1, 2];
      const result = sort(input);
      expect(result).not.toBe(input);
      expect(input).toEqual([3, 1, 2]);
    });

    it("does not call the built-in sort", () => {
      const original = Array.prototype.sort;
      const originalToSorted = Array.prototype.toSorted;
      let called = false;
      Array.prototype.sort = function (...args) {
        called = true;
        return original.apply(this, args);
      };
      Array.prototype.toSorted = function (...args) {
        called = true;
        return originalToSorted.apply(this, args);
      };
      try {
        sort([3, 1, 2]);
      } finally {
        Array.prototype.sort = original;
        Array.prototype.toSorted = originalToSorted;
      }
      expect(called).toBe(false);
    });
  });
}
