/**
 * new User(username, password) — password must be at least 8 characters
 * (RangeError). The password (or its hash) must never be readable from outside.
 *   checkPassword(attempt) → boolean
 *   changePassword(old, new) — throws a plain Error with "incorrect" in the
 *     message if old is wrong; applies the same length rule to new
 *   toJSON() → { username }
 */
import { describe, it, expect } from "vitest";
import { User } from "./User.js";

describe("User", () => {
  it("exposes the username", () => {
    expect(new User("ada", "correct horse").username).toBe("ada");
  });

  it("checks passwords", () => {
    const u = new User("ada", "correct horse");
    expect(u.checkPassword("correct horse")).toBe(true);
    expect(u.checkPassword("wrong horse")).toBe(false);
  });

  it("rejects short passwords", () => {
    expect(() => new User("ada", "short")).toThrow(RangeError);
  });

  it("never exposes the password", () => {
    const u = new User("ada", "correct horse");
    expect(Object.values(u)).not.toContain("correct horse");
    expect(JSON.stringify(u)).toBe('{"username":"ada"}');
  });

  it("changes the password when the old one is right", () => {
    const u = new User("ada", "correct horse");
    u.changePassword("correct horse", "battery staple");
    expect(u.checkPassword("battery staple")).toBe(true);
    expect(u.checkPassword("correct horse")).toBe(false);
  });

  it("refuses to change the password when the old one is wrong", () => {
    const u = new User("ada", "correct horse");
    expect(() => u.changePassword("nope", "battery staple")).toThrow(/incorrect/);
  });

  it.todo("applies the length rule to the new password too");

  it.todo("has no property that holds the hash (Object.keys is just ['username'])");
});
