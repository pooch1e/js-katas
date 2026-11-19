/**
 * pick(obj, keys) — new object with only those keys (skipping missing ones).
 * omit(obj, keys) — new object with all keys except those.
 */
import { describe, it, expect } from "vitest";
import { pick, omit } from "./pick.js";

const user = { id: 1, name: "Ada", email: "ada@example.com", password: "hunter2" };

describe("pick", () => {
  it("keeps only the listed keys", () => {
    expect(pick(user, ["id", "name"])).toEqual({ id: 1, name: "Ada" });
  });

  it("skips keys that don't exist", () => {
    expect(pick(user, ["id", "age"])).toEqual({ id: 1 });
  });

  it("does not mutate the input", () => {
    const copy = { ...user };
    pick(user, ["id"]);
    expect(user).toEqual(copy);
  });

  // { x: undefined } and {} are different objects. Which test above would catch the bug?
  it.todo("keeps a key whose value is undefined");
});

describe("omit", () => {
  it("removes the listed keys", () => {
    expect(omit(user, ["password", "email"])).toEqual({ id: 1, name: "Ada" });
  });

  it("returns a copy when nothing is omitted", () => {
    const result = omit(user, []);
    expect(result).toEqual(user);
    expect(result).not.toBe(user);
  });

  it.todo("does not mutate the input");
});
