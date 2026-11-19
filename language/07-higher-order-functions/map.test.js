/**
 * map(arr, fn) — new array of fn(item, index, arr) for each item.
 */
import { describe, it, expect, vi } from "vitest";
import { map } from "./map.js";

describe("map", () => {
  it("transforms each item", () => {
    expect(map([1, 2, 3], (n) => n * 2)).toEqual([2, 4, 6]);
  });

  it("returns an empty array for an empty input", () => {
    expect(map([], (n) => n)).toEqual([]);
  });

  it("passes the index as the second argument", () => {
    expect(map(["a", "b"], (_, i) => i)).toEqual([0, 1]);
  });

  // vi.fn() records every call it receives, so you can assert on the arguments.
  it("passes the whole array as the third argument", () => {
    const arr = [10];
    const fn = vi.fn();
    map(arr, fn);
    expect(fn).toHaveBeenCalledWith(10, 0, arr);
  });

  it("does not mutate the input", () => {
    const arr = [1, 2];
    map(arr, (n) => n + 1);
    expect(arr).toEqual([1, 2]);
  });

  it.todo("can change the type of each item (numbers to strings)");
});
