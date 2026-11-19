/**
 * retry(fn, { retries = 3, baseDelayMs = 100 }) — calls fn(). On rejection,
 * waits baseDelayMs * 2 ** attempt (100, 200, 400...) and tries again, up
 * to `retries` extra times. Rejects with the last error if all attempts fail.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { retry } from "./retry.js";

class FlakyError extends Error {}

const failTimes = (n, value = "ok") => {
  let calls = 0;
  return vi.fn(async () => {
    calls++;
    if (calls <= n) throw new FlakyError(`fail ${calls}`);
    return value;
  });
};

describe("retry", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("returns the result when fn succeeds first time", async () => {
    const fn = failTimes(0, "data");
    const p = retry(fn);
    await expect(p).resolves.toBe("data");
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("retries until fn succeeds", async () => {
    const fn = failTimes(2, "data");
    const p = retry(fn, { retries: 3, baseDelayMs: 100 });
    await vi.advanceTimersByTimeAsync(100 + 200);
    await expect(p).resolves.toBe("data");
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("waits with exponential backoff between attempts", async () => {
    const fn = failTimes(5);
    const p = retry(fn, { retries: 3, baseDelayMs: 100 });
    p.catch(() => {});
    await vi.advanceTimersByTimeAsync(0);
    expect(fn).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(99);
    expect(fn).toHaveBeenCalledTimes(1);
    await vi.advanceTimersByTimeAsync(1);
    expect(fn).toHaveBeenCalledTimes(2);
    await vi.advanceTimersByTimeAsync(200);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it("rejects with the last error after running out of retries", async () => {
    const fn = failTimes(10);
    const p = retry(fn, { retries: 2, baseDelayMs: 10 });
    const assertion = expect(p).rejects.toThrow("fail 3");
    await vi.advanceTimersByTimeAsync(10 + 20);
    await assertion;
    expect(fn).toHaveBeenCalledTimes(3);
  });

  it.todo("calls fn exactly once and rejects immediately when retries is 0");
});
