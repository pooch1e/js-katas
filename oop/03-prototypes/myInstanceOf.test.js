/**
 * myInstanceOf(obj, Ctor) — walks the prototype chain. Don't use instanceof
 * or isPrototypeOf.
 */
import { describe, it, expect } from "vitest";
import { myInstanceOf } from "./myInstanceOf.js";

class Animal {}
class Dog extends Animal {}

describe("myInstanceOf", () => {
  it("is true for a direct instance", () => {
    expect(myInstanceOf(new Dog(), Dog)).toBe(true);
  });

  it("is true for an ancestor class", () => {
    expect(myInstanceOf(new Dog(), Animal)).toBe(true);
    expect(myInstanceOf(new Dog(), Object)).toBe(true);
  });

  it("is false for an unrelated class", () => {
    expect(myInstanceOf(new Animal(), Dog)).toBe(false);
  });

  it("works with built-ins", () => {
    expect(myInstanceOf([], Array)).toBe(true);
    expect(myInstanceOf({}, Array)).toBe(false);
  });

  it.todo("is false for primitives like 'str' and 42");

  it.todo("is false for Object.create(null), which has no prototype at all");
});
