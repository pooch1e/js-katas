/**
 * pipe(...fns) — returns a function that runs fns left to right, feeding
 * each result into the next.
 */
import { describe, it, expect } from "vitest";
import { pipe } from "./pipe.js";

const inc = (n) => n + 1;
const double = (n) => n * 2;

describe("pipe", () => {
  it("returns a function", () => {
    expect(typeof pipe(inc)).toBe("function");
  });

  it("runs a single function", () => {
    expect(pipe(inc)(1)).toBe(2);
  });

  it("runs functions left to right", () => {
    expect(pipe(inc, double)(3)).toBe(8);
    expect(pipe(double, inc)(3)).toBe(7);
  });

  it("returns the input unchanged when given no functions", () => {
    expect(pipe()(42)).toBe(42);
  });

  it.todo("can be reused: the same piped function called twice gives the same answer");
});
