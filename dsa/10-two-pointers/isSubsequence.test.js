/**
 * isSubsequence(sub, str) — true if sub's characters appear in str in the
 * same order (not necessarily adjacent).
 */
import { describe, it, expect } from "vitest";
import { isSubsequence } from "./isSubsequence.js";

describe("isSubsequence", () => {
  it("finds a scattered subsequence", () => {
    expect(isSubsequence("ace", "abcde")).toBe(true);
  });

  it("respects order", () => {
    expect(isSubsequence("aec", "abcde")).toBe(false);
  });

  it("treats the empty string as a subsequence of anything", () => {
    expect(isSubsequence("", "abc")).toBe(true);
  });

  it.todo("needs repeated characters to appear enough times ('aab' in 'ab' → false)");

  it.todo("returns false when sub is longer than str");
});
