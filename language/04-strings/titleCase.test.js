/**
 * titleCase — capitalises the first letter of each word and lower-cases the rest.
 */
import { describe, it, expect } from "vitest";
import { titleCase } from "./titleCase.js";

describe("titleCase", () => {
  it("capitalises each word", () => {
    expect(titleCase("the quick fox")).toBe("The Quick Fox");
  });

  it("lower-cases the rest of each word", () => {
    expect(titleCase("hELLO wORLD")).toBe("Hello World");
  });

  it("handles a single word", () => {
    expect(titleCase("javascript")).toBe("Javascript");
  });

  // "".split(" ") is [""], and ""[0] is undefined. Calling a method on undefined crashes.
  it("returns an empty string for an empty string", () => {
    expect(titleCase("")).toBe("");
  });

  it.todo("keeps multiple spaces between words as they are");
});
