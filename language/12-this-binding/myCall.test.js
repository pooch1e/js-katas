/**
 * myCall(fn, thisArg, ...args) — calls fn with `this` set to thisArg.
 * Must not leave any visible properties on thisArg.
 */
import { describe, it, expect } from "vitest";
import { myCall } from "./myCall.js";

function introduce(greeting, punctuation) {
  return `${greeting}, I'm ${this.name}${punctuation}`;
}

describe("myCall", () => {
  it("sets this", () => {
    expect(myCall(function () { return this.name; }, { name: "Ada" })).toBe("Ada");
  });

  it("passes arguments", () => {
    expect(myCall(introduce, { name: "Ada" }, "Hi", "!")).toBe("Hi, I'm Ada!");
  });

  it("returns fn's return value", () => {
    expect(myCall(function (a, b) { return a + b + this.base; }, { base: 10 }, 1, 2)).toBe(13);
  });

  it("leaves no extra keys on thisArg", () => {
    const obj = { name: "Ada" };
    myCall(introduce, obj, "Hi", ".");
    expect(Object.keys(obj)).toEqual(["name"]);
    expect(Object.getOwnPropertySymbols(obj)).toEqual([]);
  });

  // If you use a string key like "fn", what happens to an object that already has an "fn" property?
  it.todo("does not overwrite or delete an existing property on thisArg");
});
