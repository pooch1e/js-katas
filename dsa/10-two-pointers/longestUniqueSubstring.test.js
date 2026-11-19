/**
 * longestUniqueSubstring(str) — length of the longest run of characters
 * with no character repeated.
 */
import { describe, it, expect } from "vitest";
import { longestUniqueSubstring } from "./longestUniqueSubstring.js";

describe("longestUniqueSubstring", () => {
  it("finds the classic answer", () => {
    expect(longestUniqueSubstring("abcabcbb")).toBe(3);
  });

  it("handles all-repeating strings", () => {
    expect(longestUniqueSubstring("bbbb")).toBe(1);
  });

  it("handles a run in the middle", () => {
    expect(longestUniqueSubstring("pwwkew")).toBe(3);
  });

  // "abba": when you see the second "a", its old index is behind the window's left edge.
  it("never moves the window's left edge backwards", () => {
    expect(longestUniqueSubstring("abba")).toBe(2);
  });

  it.todo("returns 0 for an empty string");

  it.todo("is O(n) on a long string");
});
