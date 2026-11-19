/**
 * myBind(fn, thisArg, ...preset) — returns a function that calls fn with
 * `this` = thisArg and arguments = [...preset, ...callArgs]. Don't use .bind.
 */
import { describe, it, expect } from "vitest";
import { myBind } from "./myBind.js";

const ada = { name: "Ada" };
function greet(greeting, punctuation) {
  return `${greeting}, ${this.name}${punctuation}`;
}

describe("myBind", () => {
  it("returns a function", () => {
    expect(typeof myBind(greet, ada)).toBe("function");
  });

  it("locks in this", () => {
    expect(myBind(greet, ada)("Hello", "!")).toBe("Hello, Ada!");
  });

  it("pre-fills arguments", () => {
    const hello = myBind(greet, ada, "Hello");
    expect(hello("?")).toBe("Hello, Ada?");
  });

  it("keeps this even when called as another object's method", () => {
    const bound = myBind(function () { return this.name; }, ada);
    const other = { name: "Bo", bound };
    expect(other.bound()).toBe("Ada");
  });

  it.todo("passes the bound function's return value through");
});
