/**
 * nQueens(n) — how many distinct arrangements of n queens on an n×n board
 * have no two queens attacking each other.
 */
import { describe, it, expect } from "vitest";
import { nQueens } from "./nQueens.js";

describe("nQueens", () => {
  it("has 1 solution for n = 1", () => {
    expect(nQueens(1)).toBe(1);
  });

  it("has no solutions for n = 2 or 3", () => {
    expect(nQueens(2)).toBe(0);
    expect(nQueens(3)).toBe(0);
  });

  it("has 2 solutions for n = 4", () => {
    expect(nQueens(4)).toBe(2);
  });

  it("has 92 solutions for n = 8", () => {
    expect(nQueens(8)).toBe(92);
  });

  // Without pruning, this is far too slow.
  it("solves n = 10 within the timeout", () => {
    expect(nQueens(10)).toBe(724);
  });

  it.todo("has 10 solutions for n = 5");

  // Stretch: export nQueensBoards(n) from nQueens.js, returning boards as arrays of strings.
  it.todo("nQueensBoards(4) returns the two boards, e.g. ['.Q..', '...Q', 'Q...', '..Q.']");
});
