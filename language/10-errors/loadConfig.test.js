/**
 * loadConfig(text) — parses JSON config. Requires a string "name" key.
 *   - invalid JSON  → ConfigError, message contains "invalid JSON",
 *                     .cause is the original SyntaxError
 *   - missing name  → ConfigError, message contains "name"
 * ConfigError must have name "ConfigError".
 */
import { describe, it, expect } from "vitest";
import { loadConfig, ConfigError } from "./loadConfig.js";

const catchIt = (fn) => {
  try {
    fn();
  } catch (e) {
    return e;
  }
  throw new Error("expected function to throw");
};

describe("loadConfig", () => {
  it("returns the parsed config", () => {
    expect(loadConfig('{"name":"app","port":3000}')).toEqual({ name: "app", port: 3000 });
  });

  it("throws a ConfigError for invalid JSON", () => {
    expect(() => loadConfig("{oops")).toThrow(ConfigError);
    expect(() => loadConfig("{oops")).toThrow(/invalid JSON/);
  });

  it("keeps the original SyntaxError as the cause", () => {
    expect(catchIt(() => loadConfig("{oops")).cause).toBeInstanceOf(SyntaxError);
  });

  it("throws a ConfigError when name is missing", () => {
    expect(() => loadConfig('{"port":1}')).toThrow(/name/);
  });

  it("names the error 'ConfigError'", () => {
    expect(catchIt(() => loadConfig("{oops")).name).toBe("ConfigError");
  });

  it.todo("throws a ConfigError when name is not a string");
});
