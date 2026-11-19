/**
 * debounce(fn, ms) — returns a function. Each call resets a timer; fn runs
 * once, ms after the last call, with the last call's arguments and `this`.
 * The returned function has .cancel() to drop a pending call.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { debounce } from "./debounce.js";

describe("debounce", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("does not call fn immediately", () => {
    const fn = vi.fn();
    debounce(fn, 100)();
    expect(fn).not.toHaveBeenCalled();
  });

  it("calls fn after ms", () => {
    const fn = vi.fn();
    debounce(fn, 100)();
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("collapses a burst of calls into one", () => {
    const fn = vi.fn();
    const d = debounce(fn, 100);
    d();
    vi.advanceTimersByTime(50);
    d();
    vi.advanceTimersByTime(50);
    d();
    vi.advanceTimersByTime(99);
    expect(fn).not.toHaveBeenCalled();
    vi.advanceTimersByTime(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("uses the latest arguments", () => {
    const fn = vi.fn();
    const d = debounce(fn, 100);
    d("a");
    d("b");
    d("c");
    vi.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith("c");
  });

  it("can be cancelled", () => {
    const fn = vi.fn();
    const d = debounce(fn, 100);
    d();
    d.cancel();
    vi.advanceTimersByTime(500);
    expect(fn).not.toHaveBeenCalled();
  });

  // Module 12: an arrow wrapper can't see the caller's `this`.
  it.todo("preserves `this` when used as an object method");
});
