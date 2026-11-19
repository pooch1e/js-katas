/**
 * chunk — [1,2,3,4,5], 2 → [[1,2],[3,4],[5]]. Throws a RangeError if size < 1.
 */
import { describe, it, expect } from "vitest";
import { chunk } from "./chunk.js";

describe("chunk", () => {
  it("splits evenly", () => {
    expect(chunk([1, 2, 3, 4], 2)).toEqual([[1, 2], [3, 4]]);
  });

  it("puts the remainder in a shorter last chunk", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it("returns one chunk when size is bigger than the array", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]]);
  });

  it("returns an empty array for an empty input", () => {
    expect(chunk([], 3)).toEqual([]);
  });

  // A size of 0 means your loop never advances.
  it("throws a RangeError for a size of 0", () => {
    expect(() => chunk([1, 2], 0)).toThrow(RangeError);
  });

  it.todo("returns chunks of length 1 when size is 1");
});
