/**
 * wordCount — counts words (split on whitespace), case-insensitively.
 */
import { describe, it, expect } from "vitest";
import { wordCount } from "./wordCount.js";

describe("wordCount", () => {
  it("counts each word", () => {
    expect(wordCount("a b a")).toEqual({ a: 2, b: 1 });
  });

  it("ignores case", () => {
    expect(wordCount("The the THE")).toEqual({ the: 3 });
  });

  // "a  b".split(" ") is ["a", "", "b"]. Look up splitting on a regex like /\s+/.
  it("handles repeated spaces and leading/trailing whitespace", () => {
    expect(wordCount("  hi   there hi ")).toEqual({ hi: 2, there: 1 });
  });

  it("returns an empty object for an empty string", () => {
    expect(wordCount("")).toEqual({});
  });

  // Try it: what is ({}).constructor? Your counts object already has keys you didn't put there.
  it.todo("counts the word 'constructor' correctly");
});
