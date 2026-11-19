/**
 * firstRepeated(arr) — the first item whose *second* occurrence comes
 * earliest. undefined if nothing repeats.
 */
import { describe, it, expect } from "vitest";
import { firstRepeated } from "./firstRepeated.js";

describe("firstRepeated", () => {
  it("finds a repeated item", () => {
    expect(firstRepeated([1, 2, 3, 2])).toBe(2);
  });

  // 1 appears first, but 3 is the first to repeat.
  it("returns the item whose repeat comes first", () => {
    expect(firstRepeated([1, 3, 3, 1])).toBe(3);
  });

  it("returns undefined when nothing repeats", () => {
    expect(firstRepeated(["a", "b"])).toBeUndefined();
  });

  it("is fast on large inputs", () => {
    const big = Array.from({ length: 200_000 }, (_, i) => i);
    big.push(199_999);
    expect(firstRepeated(big)).toBe(199_999);
  });

  it.todo("works with strings");
});
