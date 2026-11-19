/**
 * rotate — [1,2,3,4,5], 2 → [4,5,1,2,3]. Returns a new array.
 */
import { describe, it, expect } from "vitest";
import { rotate } from "./rotate.js";

describe("rotate", () => {
  it("rotates right by k", () => {
    expect(rotate([1, 2, 3, 4, 5], 2)).toEqual([4, 5, 1, 2, 3]);
  });

  it("returns the same order for k = 0", () => {
    expect(rotate([1, 2, 3], 0)).toEqual([1, 2, 3]);
  });

  it("wraps k larger than the length", () => {
    expect(rotate([1, 2, 3], 4)).toEqual([3, 1, 2]);
  });

  it("does not mutate the input", () => {
    const arr = [1, 2, 3];
    rotate(arr, 1);
    expect(arr).toEqual([1, 2, 3]);
  });

  // An empty array plus % gives you a NaN somewhere. Find it.
  it.todo("returns an empty array for an empty input");

  it.todo("returns the same order when k equals the length");
});
