/**
 * delay(ms, value) — resolves with value after ms. Uses fake timers, so no
 * test actually waits.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { delay } from "./delay.js";

describe("delay", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns a promise", () => {
    expect(delay(10)).toBeInstanceOf(Promise);
  });

  it("does not resolve before ms has passed", async () => {
    let done = false;
    delay(100).then(() => (done = true));
    await vi.advanceTimersByTimeAsync(99);
    expect(done).toBe(false);
  });

  it("resolves once ms has passed", async () => {
    let done = false;
    delay(100).then(() => (done = true));
    await vi.advanceTimersByTimeAsync(100);
    expect(done).toBe(true);
  });

  it("resolves with the given value", async () => {
    const p = delay(50, "hi");
    await vi.advanceTimersByTimeAsync(50);
    await expect(p).resolves.toBe("hi");
  });

  it.todo("resolves two delays in order of their ms, not the order they were created");
});
