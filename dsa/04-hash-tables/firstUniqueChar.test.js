/**
 * firstUniqueChar(str) — index of the first non-repeating character, or -1.
 */
import { describe, it, expect } from "vitest";
import { firstUniqueChar } from "./firstUniqueChar.js";

describe("firstUniqueChar", () => {
  it("finds the first unique character", () => {
    expect(firstUniqueChar("leetcode")).toBe(0);
    expect(firstUniqueChar("loveleetcode")).toBe(2);
  });

  it("returns -1 when every character repeats", () => {
    expect(firstUniqueChar("aabb")).toBe(-1);
  });

  it("is O(n)", () => {
    const s = "ab".repeat(100_000) + "c";
    expect(firstUniqueChar(s)).toBe(200_000);
  });

  it.todo("returns -1 for an empty string");

  it.todo("is case-sensitive ('aA' → 0)");
});
