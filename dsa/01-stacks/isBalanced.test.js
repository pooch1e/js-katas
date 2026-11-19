/**
 * isBalanced(str) — true if every bracket is closed by the matching type in
 * the right order. Other characters are ignored.
 */
import { describe, it, expect } from "vitest";
import { isBalanced } from "./isBalanced.js";

describe("isBalanced", () => {
  it("accepts simple pairs", () => {
    expect(isBalanced("()")).toBe(true);
    expect(isBalanced("[]{}()")).toBe(true);
  });

  it("accepts nesting", () => {
    expect(isBalanced("{[()()]}")).toBe(true);
  });

  it("rejects mismatched types", () => {
    expect(isBalanced("(]")).toBe(false);
  });

  it("rejects wrong nesting order", () => {
    expect(isBalanced("([)]")).toBe(false);
  });

  it.todo("rejects unclosed openers like '(('");

  // A closer with nothing to match. Popping an empty stack gives undefined. Is that handled?
  it.todo("rejects a closer that comes first like ')('");

  it.todo("ignores non-bracket characters: 'fn(a[0]) { return x; }' is balanced");
});
