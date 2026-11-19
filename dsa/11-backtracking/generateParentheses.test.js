/**
 * generateParentheses(n) — all balanced strings with n "(" and n ")", in any order.
 */
import { describe, it, expect } from "vitest";
import { generateParentheses } from "./generateParentheses.js";

describe("generateParentheses", () => {
  it("returns the single pair for n = 1", () => {
    expect(generateParentheses(1)).toEqual(["()"]);
  });

  it("returns all five for n = 3", () => {
    expect(generateParentheses(3).sort()).toEqual(["((()))", "(()())", "(())()", "()(())", "()()()"]);
  });

  it("returns the right count for n = 8", () => {
    expect(generateParentheses(8)).toHaveLength(1430);
  });

  it.todo("returns [''] for n = 0");

  it.todo("never contains an unbalanced string (check each with a counter)");
});
