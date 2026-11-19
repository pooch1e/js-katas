/**
 * letterGrade — 90+ A, 80+ B, 70+ C, 60+ D, below 60 F.
 * Throws a RangeError for scores outside 0–100 and a TypeError for non-numbers.
 */
import { describe, it, expect } from "vitest";
import { letterGrade } from "./letterGrade.js";

describe("letterGrade", () => {
  it("gives an A for 90 and above", () => {
    expect(letterGrade(95)).toBe("A");
    expect(letterGrade(100)).toBe("A");
  });

  it("puts the boundary in the higher grade", () => {
    expect(letterGrade(90)).toBe("A");
    expect(letterGrade(80)).toBe("B");
    expect(letterGrade(70)).toBe("C");
    expect(letterGrade(60)).toBe("D");
  });

  it("gives an F below 60", () => {
    expect(letterGrade(59)).toBe("F");
    expect(letterGrade(0)).toBe("F");
  });

  it("throws a RangeError above 100 or below 0", () => {
    expect(() => letterGrade(101)).toThrow(RangeError);
    expect(() => letterGrade(-1)).toThrow(RangeError);
  });

  // Pass a class to toThrow to check the error type, like the RangeError test above.
  it.todo("throws a TypeError for a string score like '85'");
});
