/**
 * promisify(fn) — returns (...args) => Promise. Resolves with result, or
 * rejects with err when err is truthy.
 */
import { describe, it, expect } from "vitest";
import { promisify } from "./promisify.js";

class LookupError extends Error {}

function lookup(id, cb) {
  setTimeout(() => {
    if (id < 0) cb(new LookupError("bad id"));
    else cb(null, { id, name: `user${id}` });
  }, 1);
}

function add(a, b, cb) {
  cb(null, a + b);
}

describe("promisify", () => {
  it("returns a function that returns a promise", () => {
    expect(promisify(add)(1, 2)).toBeInstanceOf(Promise);
  });

  it("resolves with the callback's result", async () => {
    await expect(promisify(add)(2, 3)).resolves.toBe(5);
  });

  it("works with async callbacks", async () => {
    await expect(promisify(lookup)(7)).resolves.toEqual({ id: 7, name: "user7" });
  });

  it("rejects with the callback's error", async () => {
    await expect(promisify(lookup)(-1)).rejects.toThrow(LookupError);
  });

  // What if fn throws synchronously, before ever calling the callback?
  it.todo("rejects (rather than throwing) when fn throws synchronously");
});
