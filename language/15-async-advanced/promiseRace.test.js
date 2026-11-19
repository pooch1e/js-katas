/**
 * promiseRace(values) — settles the same way as whichever input settles first.
 */
import { describe, it, expect } from "vitest";
import { promiseRace } from "./promiseRace.js";

const after = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));
class RaceError extends Error {}

describe("promiseRace", () => {
  it("resolves with the fastest", async () => {
    await expect(promiseRace([after(20, "slow"), after(1, "fast")])).resolves.toBe("fast");
  });

  it("rejects if the fastest rejects", async () => {
    const failing = new Promise((_, rej) => setTimeout(() => rej(new RaceError("x")), 1));
    await expect(promiseRace([after(20, "slow"), failing])).rejects.toThrow(RaceError);
  });

  it("treats plain values as instantly resolved", async () => {
    await expect(promiseRace([after(5, "later"), "now"])).resolves.toBe("now");
  });

  // Promise.race([]) stays pending forever. Prove yours does too, by racing it against a timeout.
  it.todo("never settles for an empty array");
});
