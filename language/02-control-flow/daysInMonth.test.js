/**
 * daysInMonth — number of days in a month (1 = January) of a given year.
 */
import { describe, it, expect } from "vitest";
import { daysInMonth } from "./daysInMonth.js";

describe("daysInMonth", () => {
  it("has 31 days in January", () => {
    expect(daysInMonth(1, 2026)).toBe(31);
  });

  it("has 30 days in April, June, September and November", () => {
    for (const m of [4, 6, 9, 11]) expect(daysInMonth(m, 2026)).toBe(30);
  });

  it("has 28 days in February of a normal year", () => {
    expect(daysInMonth(2, 2026)).toBe(28);
  });

  it("has 29 days in February of a leap year", () => {
    expect(daysInMonth(2, 2024)).toBe(29);
  });

  it("knows century years are not leap years, unless divisible by 400", () => {
    expect(daysInMonth(2, 1900)).toBe(28);
    expect(daysInMonth(2, 2000)).toBe(29);
  });

  it("throws a RangeError for month 0 or 13", () => {
    expect(() => daysInMonth(0, 2026)).toThrow(RangeError);
    expect(() => daysInMonth(13, 2026)).toThrow(RangeError);
  });

  it.todo("has 31 days in December");
});
