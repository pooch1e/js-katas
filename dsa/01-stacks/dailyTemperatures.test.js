/**
 * dailyTemperatures(temps) — for each day, how many days until a strictly
 * warmer one; 0 if never.
 */
import { describe, it, expect } from "vitest";
import { dailyTemperatures } from "./dailyTemperatures.js";

describe("dailyTemperatures", () => {
  it("solves the classic example", () => {
    expect(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])).toEqual([1, 1, 4, 2, 1, 1, 0, 0]);
  });

  it("returns all zeros for falling temperatures", () => {
    expect(dailyTemperatures([30, 20, 10])).toEqual([0, 0, 0]);
  });

  // A nested loop is O(n²) and times out here.
  it("is O(n) on a large input", () => {
    const temps = [...Array.from({ length: 100_000 }, () => 50), 51];
    const result = dailyTemperatures(temps);
    expect(result[0]).toBe(100_000);
  });

  it.todo("treats equal temperatures as not warmer");

  it.todo("returns [] for no days");
});
