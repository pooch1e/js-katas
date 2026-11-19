/**
 * memoize(fn) — returns a function that calls fn(arg) once per distinct
 * arg and returns the cached result after that. Single-argument functions only.
 */
import { describe, it, expect, vi } from "vitest";
import { memoize } from "./memoize.js";

describe("memoize", () => {
  it("returns the same result as fn", () => {
    const square = memoize((n) => n * n);
    expect(square(4)).toBe(16);
  });

  it("calls fn only once for repeated arguments", () => {
    const fn = vi.fn((n) => n * 2);
    const m = memoize(fn);
    m(5);
    m(5);
    m(5);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("caches each argument separately", () => {
    const fn = vi.fn((n) => n * 2);
    const m = memoize(fn);
    expect(m(1)).toBe(2);
    expect(m(2)).toBe(4);
    expect(m(1)).toBe(2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("keeps separate caches for separate memoized functions", () => {
    const a = memoize((n) => n + 1);
    const b = memoize((n) => n + 100);
    expect(a(1)).toBe(2);
    expect(b(1)).toBe(101);
  });

  it.todo("caches results that are undefined");

  // As object keys, 1 and "1" are the same key. A Map keeps them apart.
  it.todo("treats 1 and '1' as different arguments");
});
