/**
 * toNumberOrNull — numbers pass through, numeric strings are converted,
 * everything else (including NaN and Infinity) becomes null.
 */
import { describe, it, expect } from "vitest";
import { toNumberOrNull } from "./toNumberOrNull.js";

describe("toNumberOrNull", () => {
  it("returns numbers unchanged", () => {
    expect(toNumberOrNull(7)).toBe(7);
    expect(toNumberOrNull(-3.5)).toBe(-3.5);
  });

  it("converts numeric strings", () => {
    expect(toNumberOrNull("42")).toBe(42);
    expect(toNumberOrNull("-0.25")).toBe(-0.25);
  });

  it("ignores surrounding whitespace", () => {
    expect(toNumberOrNull("  12 ")).toBe(12);
  });

  // Number("") is 0. That's almost never what you want.
  it("returns null for empty or whitespace-only strings", () => {
    expect(toNumberOrNull("")).toBeNull();
    expect(toNumberOrNull("   ")).toBeNull();
  });

  it("returns null for strings that are only partly numeric", () => {
    expect(toNumberOrNull("12px")).toBeNull();
    expect(toNumberOrNull("abc")).toBeNull();
  });

  it("returns null for NaN and Infinity", () => {
    expect(toNumberOrNull(NaN)).toBeNull();
    expect(toNumberOrNull(Infinity)).toBeNull();
  });

  // Number(true) is 1 and Number(null) is 0. Neither is a number the user typed.
  it.todo("returns null for booleans, null and undefined");

  it.todo("returns null for arrays and objects");
});
