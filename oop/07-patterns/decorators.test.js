/**
 * Each decorator returns a function with the same signature as fn, passing
 * arguments and `this` through.
 *   withLogging(fn, logger) — logger.log(`${fn.name}(${args joined by ", "})`)
 *     before calling; returns fn's result
 *   withTiming(fn, { clock, onTime }) — calls onTime(fn.name, elapsed) after
 *     fn finishes (or throws), using clock.now()
 *   withRetry(fn, attempts) — async: retries a rejecting fn up to `attempts`
 *     total calls, then rethrows the last error
 */
import { describe, it, expect, vi } from "vitest";
import { withLogging, withTiming, withRetry } from "./decorators.js";

function add(a, b) {
  return a + b;
}

class FlakyError extends Error {}

describe("withLogging", () => {
  it("logs the call and returns the result", () => {
    const logger = { log: vi.fn() };
    expect(withLogging(add, logger)(2, 3)).toBe(5);
    expect(logger.log).toHaveBeenCalledWith("add(2, 3)");
  });

  it("preserves this", () => {
    const counter = { n: 1, get: withLogging(function get() { return this.n; }, { log() {} }) };
    expect(counter.get()).toBe(1);
  });
});

describe("withTiming", () => {
  it("reports elapsed time from the clock", () => {
    const times = [100, 175];
    const clock = { now: () => times.shift() };
    const onTime = vi.fn();
    withTiming(add, { clock, onTime })(1, 1);
    expect(onTime).toHaveBeenCalledWith("add", 75);
  });

  it.todo("still reports timing when fn throws, and rethrows");
});

describe("withRetry", () => {
  it("retries until success", async () => {
    let calls = 0;
    const flaky = async () => {
      if (++calls < 3) throw new FlakyError("not yet");
      return "ok";
    };
    await expect(withRetry(flaky, 3)()).resolves.toBe("ok");
  });

  it("gives up after the given attempts", async () => {
    const fn = vi.fn(async () => {
      throw new FlakyError("always");
    });
    await expect(withRetry(fn, 2)()).rejects.toThrow(FlakyError);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Decorators stack because they share a shape.
  it.todo("stacks: withLogging(withRetry(fn, 3), logger) logs once per outer call");
});
