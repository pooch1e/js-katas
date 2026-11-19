/**
 * getPath — reads a dot-separated path from nested objects. Returns
 * fallback if any step is missing.
 */
import { describe, it, expect } from "vitest";
import { getPath } from "./getPath.js";

const data = { user: { address: { city: "Leeds" }, tags: ["a", "b"], score: 0 } };

describe("getPath", () => {
  it("reads a top-level key", () => {
    expect(getPath({ a: 1 }, "a")).toBe(1);
  });

  it("reads a nested key", () => {
    expect(getPath(data, "user.address.city")).toBe("Leeds");
  });

  it("returns the fallback when a key is missing", () => {
    expect(getPath(data, "user.phone", "n/a")).toBe("n/a");
  });

  it("does not crash when an earlier step is missing", () => {
    expect(getPath(data, "account.owner.name", null)).toBeNull();
  });

  // `value || fallback` is the bug here.
  it("returns falsy values like 0 instead of the fallback", () => {
    expect(getPath(data, "user.score", 99)).toBe(0);
  });

  it.todo("reads array items by index ('user.tags.1')");
});
