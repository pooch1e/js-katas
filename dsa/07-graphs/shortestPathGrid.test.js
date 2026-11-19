/**
 * shortestPathGrid(grid, [r, c], [r, c]) — grid is an array of strings; "#"
 * is a wall, anything else is open. Moves are up/down/left/right. Returns
 * the number of steps, or -1 if unreachable.
 */
import { describe, it, expect } from "vitest";
import { shortestPathGrid } from "./shortestPathGrid.js";

describe("shortestPathGrid", () => {
  it("counts steps on an open grid", () => {
    expect(shortestPathGrid(["...", "...", "..."], [0, 0], [2, 2])).toBe(4);
  });

  it("routes around walls", () => {
    const grid = [
      "..#.",
      "..#.",
      "....",
    ];
    expect(shortestPathGrid(grid, [0, 0], [0, 3])).toBe(7);
  });

  it("returns -1 when the end is walled off", () => {
    expect(shortestPathGrid([".#.", "##.", "..."], [0, 0], [2, 2])).toBe(-1);
  });

  it("returns 0 when start is the end", () => {
    expect(shortestPathGrid(["."], [0, 0], [0, 0])).toBe(0);
  });

  it("is fast on a large open grid", () => {
    const grid = Array.from({ length: 300 }, () => ".".repeat(300));
    expect(shortestPathGrid(grid, [0, 0], [299, 299])).toBe(598);
  });

  it.todo("returns -1 when the end cell itself is a wall");
});
