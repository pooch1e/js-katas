/**
 * isPalindrome — true if the letters and digits read the same both ways.
 */
import { describe, it, expect } from "vitest";
import { isPalindrome } from "./isPalindrome.js";

describe("isPalindrome", () => {
  it("recognises a simple palindrome", () => {
    expect(isPalindrome("racecar")).toBe(true);
  });

  it("rejects a non-palindrome", () => {
    expect(isPalindrome("hello")).toBe(false);
  });

  it("ignores case", () => {
    expect(isPalindrome("Racecar")).toBe(true);
  });

  it("ignores spaces and punctuation", () => {
    expect(isPalindrome("A man, a plan, a canal: Panama")).toBe(true);
  });

  it.todo("treats the empty string as a palindrome");

  it.todo("includes digits in the comparison ('1a2' is not, '12a21' is)");
});
