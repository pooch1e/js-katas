/**
 * reverseString — reverses the characters of a string.
 */
import { describe, it, expect } from "vitest";
import { reverseString } from "./reverseString.js";

describe("reverseString", () => {
  it("reverses a word", () => {
    expect(reverseString("hello")).toBe("olleh");
  });

  it("reverses a sentence including spaces", () => {
    expect(reverseString("ab cd")).toBe("dc ba");
  });

  it("returns an empty string for an empty string", () => {
    expect(reverseString("")).toBe("");
  });

  // "👍".length is 2. split("") breaks emoji into halves; [...str] doesn't.
  it("keeps emoji intact", () => {
    expect(reverseString("a👍b")).toBe("b👍a");
  });

  it.todo("returns a single character unchanged");
});
