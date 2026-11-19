/**
 * numIslands(grid) — grid is an array of strings of "1" (land) and "0"
 * (water). Land connects up/down/left/right, not diagonally. Must not
 * mutate the grid.
 */
import { describe, it, expect } from "vitest";
import { numIslands } from "./numIslands.js";

describe("numIslands", () => {
  it("counts one big island", () => {
    expect(numIslands(["11110", "11010", "11000", "00000"])).toBe(1);
  });

  it("counts separate islands", () => {
    expect(numIslands(["11000", "11000", "00100", "00011"])).toBe(3);
  });

  it("does not connect diagonals", () => {
    expect(numIslands(["101", "010", "101"])).toBe(5);
  });

  it("returns 0 for all water", () => {
    expect(numIslands(["000", "000"])).toBe(0);
  });

  it.todo("returns 0 for an empty grid");

  // A U-shaped island trips up solutions that only look right and down.
  it.todo("counts a U-shaped island as one ('101', '101', '111')");
});
