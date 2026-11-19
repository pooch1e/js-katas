/**
 * longestCommonSubsequence(a, b) — length of the longest sequence of
 * characters appearing in both strings in the same order (not necessarily adjacent).
 */
import { describe, it, expect } from "vitest";
import { longestCommonSubsequence } from "./longestCommonSubsequence.js";

describe("longestCommonSubsequence", () => {
  it("finds the LCS length", () => {
    expect(longestCommonSubsequence("abcde", "ace")).toBe(3);
  });

  it("returns the full length for identical strings", () => {
    expect(longestCommonSubsequence("abc", "abc")).toBe(3);
  });

  it("returns 0 when nothing is shared", () => {
    expect(longestCommonSubsequence("abc", "def")).toBe(0);
  });

  it("handles long strings quickly", () => {
    const a = "ab".repeat(1000);
    const b = "ba".repeat(1000);
    expect(longestCommonSubsequence(a, b)).toBe(1999);
  });

  it.todo("returns 0 when either string is empty");

  // Stretch: return the subsequence itself by walking back through your table.
  it.todo("returns 'ace' from a longestCommonSubsequenceString('abcde', 'ace') variant");
});
