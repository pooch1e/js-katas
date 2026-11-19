/**
 * createTicker(intervalMs) → { ticks, running, start(), stop() }
 *   start() — begins incrementing ticks every intervalMs; calling it again
 *             while running does nothing
 *   stop()  — stops ticking
 * Implement it as an object literal whose methods use `this`.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createTicker } from "./createTicker.js";

describe("createTicker", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("starts at 0 ticks and not running", () => {
    const t = createTicker(100);
    expect(t.ticks).toBe(0);
    expect(t.running).toBe(false);
  });

  it("ticks every interval after start", () => {
    const t = createTicker(100);
    t.start();
    vi.advanceTimersByTime(350);
    expect(t.ticks).toBe(3);
    expect(t.running).toBe(true);
  });

  it("stops ticking after stop", () => {
    const t = createTicker(100);
    t.start();
    vi.advanceTimersByTime(200);
    t.stop();
    vi.advanceTimersByTime(500);
    expect(t.ticks).toBe(2);
    expect(t.running).toBe(false);
  });

  // Two intervals running at once would double the tick rate.
  it("ignores start while already running", () => {
    const t = createTicker(100);
    t.start();
    t.start();
    vi.advanceTimersByTime(300);
    expect(t.ticks).toBe(3);
  });

  it.todo("can be restarted after stopping and keeps its tick count");
});
