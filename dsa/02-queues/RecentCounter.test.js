/**
 * new RecentCounter(windowMs = 3000). ping(t) records a ping at time t (ms,
 * always increasing) and returns how many pings fall within [t - windowMs, t].
 */
import { describe, it, expect } from "vitest";
import { RecentCounter } from "./RecentCounter.js";

describe("RecentCounter", () => {
  it("counts pings in the window", () => {
    const c = new RecentCounter();
    expect(c.ping(1)).toBe(1);
    expect(c.ping(100)).toBe(2);
    expect(c.ping(3001)).toBe(3);
  });

  it("drops pings that fall out of the window", () => {
    const c = new RecentCounter();
    c.ping(1);
    c.ping(100);
    c.ping(3001);
    expect(c.ping(3002)).toBe(3);
  });

  it("supports a custom window", () => {
    const c = new RecentCounter(10);
    c.ping(1);
    c.ping(5);
    expect(c.ping(20)).toBe(1);
  });

  it("is fast with many pings", () => {
    const c = new RecentCounter(100);
    let last = 0;
    for (let t = 1; t <= 200_000; t++) last = c.ping(t);
    expect(last).toBe(101);
  });

  it.todo("includes a ping exactly windowMs ago");
});
