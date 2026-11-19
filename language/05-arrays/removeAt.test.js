/**
 * removeAt — returns a copy with arr[index] removed. Throws a RangeError for
 * an index that isn't a whole number within the array.
 */
import { describe, it, expect } from "vitest";
import { removeAt } from "./removeAt.js";

describe("removeAt", () => {
  it("removes from the middle", () => {
    expect(removeAt([1, 2, 3], 1)).toEqual([1, 3]);
  });

  it("removes the first and last items", () => {
    expect(removeAt([1, 2, 3], 0)).toEqual([2, 3]);
    expect(removeAt([1, 2, 3], 2)).toEqual([1, 2]);
  });

  it("does not mutate the input", () => {
    const arr = [1, 2, 3];
    removeAt(arr, 1);
    expect(arr).toEqual([1, 2, 3]);
  });

  it("throws a RangeError for an index past the end", () => {
    expect(() => removeAt([1, 2, 3], 3)).toThrow(RangeError);
  });

  // slice treats -1 as "from the end", so this won't throw unless you check it.
  it.todo("throws a RangeError for a negative index");

  it.todo("throws a RangeError for a non-integer index like 1.5");
});
