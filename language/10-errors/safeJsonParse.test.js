/**
 * safeJsonParse(text) — { ok: true, value } on success,
 * { ok: false, error } (the caught error) on failure. Never throws.
 */
import { describe, it, expect } from "vitest";
import { safeJsonParse } from "./safeJsonParse.js";

describe("safeJsonParse", () => {
  it("returns ok with the parsed value", () => {
    expect(safeJsonParse('{"a":1}')).toEqual({ ok: true, value: { a: 1 } });
  });

  it("returns ok: false for invalid JSON", () => {
    expect(safeJsonParse("{nope").ok).toBe(false);
  });

  it("includes the original SyntaxError", () => {
    expect(safeJsonParse("{nope").error).toBeInstanceOf(SyntaxError);
  });

  // JSON.parse("null") is valid and returns null. Is that ok?
  it.todo("treats 'null' as a successful parse");

  it.todo("does not throw for an empty string");
});
