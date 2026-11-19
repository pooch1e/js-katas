/**
 * knapsack(items, capacity) — items are { weight, value }; each can be taken
 * once. Returns the highest total value with total weight <= capacity.
 */
import { describe, it, expect } from "vitest";
import { knapsack } from "./knapsack.js";

describe("knapsack", () => {
  it("picks the best combination", () => {
    const items = [
      { weight: 1, value: 1 },
      { weight: 3, value: 4 },
      { weight: 4, value: 5 },
      { weight: 5, value: 7 },
    ];
    expect(knapsack(items, 7)).toBe(9);
  });

  it("returns 0 when nothing fits", () => {
    expect(knapsack([{ weight: 10, value: 100 }], 5)).toBe(0);
  });

  // Greedy by value-per-weight takes the first item and then can't fit the rest.
  it("beats a greedy approach", () => {
    const items = [
      { weight: 6, value: 30 },
      { weight: 5, value: 20 },
      { weight: 5, value: 20 },
    ];
    expect(knapsack(items, 10)).toBe(40);
  });

  it("handles 100 items quickly", () => {
    const items = Array.from({ length: 100 }, (_, i) => ({ weight: (i % 13) + 1, value: (i * 7) % 23 }));
    expect(knapsack(items, 200)).toBe(689);
  });

  it.todo("does not use an item twice");

  it.todo("returns 0 for no items");
});
