/**
 * throttle(fn, ms) — the first call runs fn immediately; calls in the next
 * ms are dropped; after the window, the next call runs again.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { throttle } from "./throttle.js";

describe("throttle", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("calls fn immediately on the first call", () => {
    const fn = vi.fn();
    throttle(fn, 100)("x");
    expect(fn).toHaveBeenCalledWith("x");
  });

  it("drops calls inside the window", () => {
    const fn = vi.fn();
    const t = throttle(fn, 100);
    t();
    t();
    vi.advanceTimersByTime(50);
    t();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("allows another call after the window", () => {
    const fn = vi.fn();
    const t = throttle(fn, 100);
    t("first");
    vi.advanceTimersByTime(100);
    t("second");
    expect(fn).toHaveBeenCalledTimes(2);
    expect(fn).toHaveBeenLastCalledWith("second");
  });

  it("does not run dropped calls later", () => {
    const fn = vi.fn();
    const t = throttle(fn, 100);
    t();
    t();
    vi.advanceTimersByTime(1000);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it.todo("returns fn's return value for calls that run");

  // Stretch: add a { trailing: true } option that runs the last dropped call when the window ends.
  it.todo("supports { trailing: true }");
});
