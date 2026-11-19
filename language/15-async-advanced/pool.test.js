/**
 * pool(tasks, limit) — tasks are functions returning promises. Runs at most
 * limit at a time, starting the next as soon as one finishes. Resolves with
 * results in task order. Rejects on the first failure.
 */
import { describe, it, expect } from "vitest";
import { pool } from "./pool.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function tracker() {
  const t = { running: 0, max: 0 };
  t.task = (ms, v) => async () => {
    t.running++;
    t.max = Math.max(t.max, t.running);
    await wait(ms);
    t.running--;
    return v;
  };
  return t;
}

describe("pool", () => {
  it("resolves with results in task order", async () => {
    const t = tracker();
    await expect(pool([t.task(10, "a"), t.task(1, "b"), t.task(5, "c")], 2)).resolves.toEqual(["a", "b", "c"]);
  });

  it("never runs more than limit tasks at once", async () => {
    const t = tracker();
    await pool(Array.from({ length: 8 }, (_, i) => t.task(3, i)), 3);
    expect(t.max).toBe(3);
  });

  it("actually runs tasks in parallel up to the limit", async () => {
    const t = tracker();
    const start = Date.now();
    await pool(Array.from({ length: 4 }, () => t.task(40)), 4);
    expect(Date.now() - start).toBeLessThan(120);
  });

  it("works when limit is larger than the number of tasks", async () => {
    const t = tracker();
    await expect(pool([t.task(1, 1)], 10)).resolves.toEqual([1]);
  });

  it("resolves [] for no tasks", async () => {
    await expect(pool([], 2)).resolves.toEqual([]);
  });

  it.todo("rejects when a task rejects");

  // Reuse the tracker: with limit 1, t.max should be 1 and order should be kept.
  it.todo("behaves like sequence (one at a time) with limit 1");
});
