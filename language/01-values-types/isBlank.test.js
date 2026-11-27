/**
 * isBlank — null, undefined, "" and whitespace-only strings are blank.
 * Everything else, including 0 and false, is not.
 */
import { describe, it, expect } from "vitest";
import { isBlank } from "./isBlank.js";

describe("isBlank", () => {
  it("is true for null and undefined", () => {
    expect(isBlank(null)).toBe(true);
    expect(isBlank(undefined)).toBe(true);
  });

  it("is true for an empty string", () => {
    expect(isBlank("")).toBe(true);
  });

  it("is true for a whitespace-only string", () => {
    expect(isBlank("   ")).toBe(true);
    expect(isBlank("\t\n")).toBe(true);
  });

  it("is false for a string with content", () => {
    expect(isBlank(" a ")).toBe(false);
  });

  // The trap: 0 and false are falsy, but they are real values.
  it("is false for 0 and false", () => {
    expect(isBlank(0)).toBe(false);
    expect(isBlank(false)).toBe(false);
  });
});
