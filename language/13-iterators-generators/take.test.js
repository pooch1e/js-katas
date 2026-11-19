/**
 * take(iterable, n) — returns an array of at most n values. Must not pull
 * more values than it needs.
 */
import { describe, it, expect } from "vitest";
import { take } from "./take.js";

function* naturals() {
  let n = 1;
  while (true) yield n++;
}

describe("take", () => {
  it("takes from an array", () => {
    expect(take([1, 2, 3, 4], 2)).toEqual([1, 2]);
  });

  it("takes from a string", () => {
    expect(take("hello", 3)).toEqual(["h", "e", "l"]);
  });

  it("takes from an infinite generator", () => {
    expect(take(naturals(), 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("returns everything when n is larger than the iterable", () => {
    expect(take(new Set([1, 2]), 10)).toEqual([1, 2]);
  });

  it("does not pull more values than it needs", () => {
    let pulled = 0;
    function* counting() {
      while (true) yield ++pulled;
    }
    take(counting(), 3);
    expect(pulled).toBe(3);
  });

  it.todo("returns [] for n = 0 without pulling anything");
});
