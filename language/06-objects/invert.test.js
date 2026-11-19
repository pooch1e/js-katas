/**
 * invert — swaps keys and values. If two keys share a value, the later one wins.
 */
import { describe, it, expect } from "vitest";
import { invert } from "./invert.js";

describe("invert", () => {
  it("swaps keys and values", () => {
    expect(invert({ a: "x", b: "y" })).toEqual({ x: "a", y: "b" });
  });

  it("returns an empty object for an empty object", () => {
    expect(invert({})).toEqual({});
  });

  it("lets the later key win when values collide", () => {
    expect(invert({ a: "x", b: "x" })).toEqual({ x: "b" });
  });

  // Object keys are always strings.
  it.todo("turns number values into string keys");
});
