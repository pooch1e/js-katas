/**
 * promiseAll(values) — resolves with all results in input order, or rejects
 * with the first rejection. Plain values count as already resolved.
 */
import { describe, it, expect } from "vitest";
import { promiseAll } from "./promiseAll.js";

const after = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
class FetchError extends Error {}

describe("promiseAll", () => {
  it("resolves with every result", async () => {
    await expect(promiseAll([after(1, "a"), after(1, "b")])).resolves.toEqual(["a", "b"]);
  });

  it("keeps input order even when later promises finish first", async () => {
    await expect(promiseAll([after(20, "slow"), after(1, "fast")])).resolves.toEqual(["slow", "fast"]);
  });

  it("resolves [] for an empty array", async () => {
    await expect(promiseAll([])).resolves.toEqual([]);
  });

  it("accepts plain values", async () => {
    await expect(promiseAll([1, after(1, 2), 3])).resolves.toEqual([1, 2, 3]);
  });

  it("rejects with the first rejection", async () => {
    const failing = new Promise((_, rej) => setTimeout(() => rej(new FetchError("nope")), 5));
    await expect(promiseAll([after(50, "ok"), failing])).rejects.toThrow(FetchError);
  });

  it("rejects without waiting for slow promises", async () => {
    const start = Date.now();
    const failing = Promise.reject(new FetchError("fast fail"));
    await expect(promiseAll([after(500, "slow"), failing])).rejects.toThrow(FetchError);
    expect(Date.now() - start).toBeLessThan(200);
  });

  it.todo("does not call Promise.all (spy on it with vi.spyOn and assert it wasn't called)");
});
