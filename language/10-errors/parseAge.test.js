/**
 * parseAge(input) — accepts a number or numeric string (whitespace trimmed).
 * Returns an integer 0–150. Throws ValidationError (field "age") when:
 *   - input is empty or missing   → message contains "required"
 *   - input isn't a number        → message contains "must be a number"
 *   - not a whole number          → message contains "whole number"
 *   - outside 0–150               → message contains "between 0 and 150"
 */
import { describe, it, expect } from "vitest";
import { parseAge } from "./parseAge.js";
import { ValidationError } from "./ValidationError.js";

describe("parseAge", () => {
  it("accepts numbers and numeric strings", () => {
    expect(parseAge(30)).toBe(30);
    expect(parseAge(" 42 ")).toBe(42);
  });

  it("throws a ValidationError for missing input", () => {
    expect(() => parseAge("")).toThrow(ValidationError);
    expect(() => parseAge(undefined)).toThrow(/required/);
  });

  it("explains non-numeric input", () => {
    expect(() => parseAge("abc")).toThrow(/must be a number/);
  });

  it("explains non-integers", () => {
    expect(() => parseAge("12.5")).toThrow(/whole number/);
  });

  it("explains out-of-range ages", () => {
    expect(() => parseAge(-1)).toThrow(/between 0 and 150/);
    expect(() => parseAge(200)).toThrow(/between 0 and 150/);
  });

  // To check a property of the thrown error, catch it yourself:
  //   let err; try { parseAge("x"); } catch (e) { err = e; }
  it.todo("sets the error's field to 'age'");

  it.todo("accepts the boundaries 0 and 150");
});
