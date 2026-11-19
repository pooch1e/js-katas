/**
 * countVowels — counts the vowels a, e, i, o, u, ignoring case. "y" is not a vowel here.
 */
import { describe, it, expect } from "vitest";
import { countVowels } from "./countVowels.js";

describe("countVowels", () => {
  it("counts vowels in a word", () => {
    expect(countVowels("banana")).toBe(3);
  });

  it("counts upper-case vowels", () => {
    expect(countVowels("AEIOU")).toBe(5);
  });

  it("returns 0 when there are none", () => {
    expect(countVowels("rhythm")).toBe(0);
  });

  it.todo("returns 0 for an empty string");
});
