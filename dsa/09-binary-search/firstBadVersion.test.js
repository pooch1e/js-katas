/**
 * firstBadVersion(n, isBad) — versions 1..n; once a version is bad, every
 * later one is too. Returns the first bad version, or -1 if none.
 */
import { describe, it, expect, vi } from "vitest";
import { firstBadVersion } from "./firstBadVersion.js";

const badFrom = (first) => vi.fn((v) => v >= first);

describe("firstBadVersion", () => {
  it("finds the first bad version", () => {
    expect(firstBadVersion(10, badFrom(4))).toBe(4);
  });

  it("handles the very first version being bad", () => {
    expect(firstBadVersion(10, badFrom(1))).toBe(1);
  });

  it("handles only the last version being bad", () => {
    expect(firstBadVersion(10, badFrom(10))).toBe(10);
  });

  it("calls isBad O(log n) times", () => {
    const isBad = badFrom(1_234_567);
    expect(firstBadVersion(2_000_000_000, isBad)).toBe(1_234_567);
    expect(isBad.mock.calls.length).toBeLessThanOrEqual(33);
  });

  it.todo("returns -1 when no version is bad");

  it.todo("works with n = 1");
});
