/**
 * coinChange(coins, amount) — fewest coins (unlimited supply of each) that
 * sum to amount, or -1 if impossible.
 */
import { describe, it, expect } from "vitest";
import { coinChange } from "./coinChange.js";

describe("coinChange", () => {
  it("finds the fewest coins", () => {
    expect(coinChange([1, 2, 5], 11)).toBe(3);
  });

  it("returns -1 when impossible", () => {
    expect(coinChange([2], 3)).toBe(-1);
  });

  it("returns 0 for amount 0", () => {
    expect(coinChange([1], 0)).toBe(0);
  });

  // Greedy (always take the biggest coin) gives 3 + 1 + 1 + 1 = 4 coins. The answer is 3 + 3 = 2.
  it("beats a greedy approach", () => {
    expect(coinChange([1, 3, 4], 6)).toBe(2);
  });

  it("handles a large amount quickly", () => {
    expect(coinChange([186, 419, 83, 408], 6249)).toBe(20);
  });

  it.todo("works with a single coin that divides the amount exactly");
});
