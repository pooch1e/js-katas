/**
 * sequence(tasks) — tasks is an array of functions returning promises. Runs
 * each only after the previous one finishes; resolves with results in order.
 * If a task rejects, sequence rejects and later tasks don't run.
 */
import { describe, it, expect, vi } from "vitest";
import { sequence } from "./sequence.js";

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

describe("sequence", () => {
  it("resolves with results in order", async () => {
    const tasks = [async () => 1, async () => 2, async () => 3];
    await expect(sequence(tasks)).resolves.toEqual([1, 2, 3]);
  });

  it("runs tasks one at a time", async () => {
    let running = 0;
    let maxRunning = 0;
    const task = (v) => async () => {
      running++;
      maxRunning = Math.max(maxRunning, running);
      await wait(5);
      running--;
      return v;
    };
    await sequence([task("a"), task("b"), task("c")]);
    expect(maxRunning).toBe(1);
  });

  it("keeps order even when earlier tasks are slower", async () => {
    const tasks = [() => wait(15).then(() => "slow"), () => wait(1).then(() => "fast")];
    await expect(sequence(tasks)).resolves.toEqual(["slow", "fast"]);
  });

  it("resolves [] for no tasks", async () => {
    await expect(sequence([])).resolves.toEqual([]);
  });

  it.todo("rejects when a task rejects, and does not start the tasks after it");

  it.todo("does not start any task before sequence is called (tasks are functions, not promises)");
});
