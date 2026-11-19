/**
 * uniq — returns a new array of unique items in first-seen order.
 */
import { describe, it, expect } from "vitest";
import { uniq } from "./uniq.js";

describe("uniq", () => {
  it("removes duplicate numbers", () => {
    expect(uniq([1, 2, 1, 3, 2])).toEqual([1, 2, 3]);
  });

  it("keeps first-seen order", () => {
    expect(uniq(["b", "a", "b", "c", "a"])).toEqual(["b", "a", "c"]);
  });

  it("returns a copy, even when there are no duplicates", () => {
    const arr = [1, 2, 3];
    expect(uniq(arr)).toEqual([1, 2, 3]);
    expect(uniq(arr)).not.toBe(arr);
  });

  it("treats 1 and '1' as different", () => {
    expect(uniq([1, "1", 1])).toEqual([1, "1"]);
  });

  it.todo("returns an empty array for an empty input");
});
