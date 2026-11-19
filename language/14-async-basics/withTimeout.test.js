/**
 * withTimeout(promise, ms) — settles like promise if it settles within ms;
 * otherwise rejects with a TimeoutError. Clears its timer when promise wins.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { withTimeout, TimeoutError } from "./withTimeout.js";

class DbError extends Error {}

const after = (ms, value) => new Promise((r) => setTimeout(() => r(value), ms));

describe("withTimeout", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("resolves with the value when the promise is fast enough", async () => {
    const p = withTimeout(after(50, "data"), 100);
    await vi.advanceTimersByTimeAsync(50);
    await expect(p).resolves.toBe("data");
  });

  // Attach the expectation before advancing time, or the rejection goes unhandled.
  it("rejects with a TimeoutError when the promise is too slow", async () => {
    const p = withTimeout(after(500, "data"), 100);
    const assertion = expect(p).rejects.toThrow(TimeoutError);
    await vi.advanceTimersByTimeAsync(100);
    await assertion;
  });

  it("passes through the promise's own rejection", async () => {
    const failing = new Promise((_, reject) => setTimeout(() => reject(new DbError("down")), 10));
    const p = withTimeout(failing, 100);
    const assertion = expect(p).rejects.toThrow(DbError);
    await vi.advanceTimersByTimeAsync(10);
    await assertion;
  });

  it("clears its timer when the promise wins", async () => {
    const p = withTimeout(Promise.resolve("quick"), 1000);
    await vi.advanceTimersByTimeAsync(0);
    await p;
    expect(vi.getTimerCount()).toBe(0);
  });

  it.todo("clears its timer when the promise rejects first, too");
});
