/**
 * once(fn) — the first call runs fn and returns its result; every later
 * call returns that same result without calling fn again.
 */
import { describe, it, expect, vi } from "vitest";
import { once } from "./once.js";

describe("once", () => {
  it("calls fn on the first call", () => {
    const fn = vi.fn(() => "done");
    expect(once(fn)()).toBe("done");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("does not call fn again on later calls", () => {
    const fn = vi.fn();
    const wrapped = once(fn);
    wrapped();
    wrapped();
    wrapped();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("returns the first result every time", () => {
    let n = 0;
    const wrapped = once(() => ++n);
    expect(wrapped()).toBe(1);
    expect(wrapped()).toBe(1);
  });

  it("passes arguments through", () => {
    const wrapped = once((a, b) => a + b);
    expect(wrapped(2, 3)).toBe(5);
    expect(wrapped(10, 10)).toBe(5);
  });

  // If you test "has it run?" by checking the result, a fn that returns undefined runs again.
  it.todo("only calls fn once even when fn returns undefined");
});
