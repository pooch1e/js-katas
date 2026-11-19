/**
 * compressRuns — run-length encoding: each run of a character becomes the
 * character followed by its count.
 */
import { describe, it, expect } from "vitest";
import { compressRuns } from "./compressRuns.js";

describe("compressRuns", () => {
  it("compresses runs of repeated characters", () => {
    expect(compressRuns("aaabcc")).toBe("a3b1c2");
  });

  it("writes a count of 1 for single characters", () => {
    expect(compressRuns("abc")).toBe("a1b1c1");
  });

  it("returns an empty string for an empty string", () => {
    expect(compressRuns("")).toBe("");
  });

  // The usual bug is forgetting the final run when the loop ends.
  it("includes the last run", () => {
    expect(compressRuns("abbb")).toBe("a1b3");
  });

  it.todo("counts runs separately when a character comes back later ('aabaa')");

  it.todo("handles runs of 10 or more ('a' x 12 → 'a12')");
});
