/**
 * getType — returns one of: "undefined", "null", "boolean", "number", "nan",
 * "string", "array", "function", "object".
 */
import { describe, it, expect } from "vitest";
import { getType } from "./getType.js";

describe("getType", () => {
  it("returns 'string' for strings", () => {
    expect(getType("hello")).toBe("string");
    expect(getType("")).toBe("string");
  });

  it("returns 'number' for numbers", () => {
    expect(getType(42)).toBe("number");
    expect(getType(-0.5)).toBe("number");
  });

  it("returns 'null' for null, not 'object'", () => {
    expect(getType(null)).toBe("null");
  });

  it("returns 'array' for arrays, not 'object'", () => {
    expect(getType([])).toBe("array");
    expect(getType([1, 2])).toBe("array");
  });

  it("returns 'nan' for NaN, not 'number'", () => {
    expect(getType(NaN)).toBe("nan");
    expect(getType(0 / 0)).toBe("nan");
  });

  it("returns 'object' for plain objects", () => {
    expect(getType({ a: 1 })).toBe("object");
  });

  it("returns 'undefined' for undefined", () => {
    expect(getType(undefined)).toBe("undefined");
  });

  it.todo("returns 'boolean' for true and false");

  // Arrow functions, regular functions and classes are all functions.
  it.todo("returns 'function' for functions and classes");
});
