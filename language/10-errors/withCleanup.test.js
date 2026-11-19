/**
 * withCleanup(fn, cleanup) — returns fn()'s result, or re-throws fn()'s
 * error. cleanup() runs exactly once either way, after fn.
 */
import { describe, it, expect, vi } from "vitest";
import { withCleanup } from "./withCleanup.js";

class BoomError extends Error {}

describe("withCleanup", () => {
  it("returns fn's result", () => {
    expect(withCleanup(() => 42, () => {})).toBe(42);
  });

  it("runs cleanup after success", () => {
    const cleanup = vi.fn();
    withCleanup(() => 1, cleanup);
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it("re-throws fn's error", () => {
    expect(() => withCleanup(() => { throw new BoomError("boom"); }, () => {})).toThrow(BoomError);
  });

  it("runs cleanup even when fn throws", () => {
    const cleanup = vi.fn();
    try {
      withCleanup(() => { throw new BoomError("boom"); }, cleanup);
    } catch {}
    expect(cleanup).toHaveBeenCalledTimes(1);
  });

  it.todo("runs cleanup after fn, not before (record the order in an array)");
});
