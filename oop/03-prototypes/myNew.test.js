/**
 * myNew(Ctor, ...args) — without using `new` or Reflect.construct.
 */
import { describe, it, expect } from "vitest";
import { myNew } from "./myNew.js";

function Dog(name) {
  this.name = name;
}
Dog.prototype.speak = function () {
  return `${this.name} says woof`;
};

describe("myNew", () => {
  it("sets up own properties via the constructor", () => {
    expect(myNew(Dog, "Rex").name).toBe("Rex");
  });

  it("links the result to Ctor.prototype", () => {
    const d = myNew(Dog, "Rex");
    expect(Object.getPrototypeOf(d)).toBe(Dog.prototype);
    expect(d.speak()).toBe("Rex says woof");
  });

  it("makes instanceof work", () => {
    expect(myNew(Dog, "Rex")).toBeInstanceOf(Dog);
  });

  // Rule 3: an object returned from the constructor replaces the new object.
  it("uses an object returned from the constructor", () => {
    function Weird() {
      this.a = 1;
      return { b: 2 };
    }
    expect(myNew(Weird)).toEqual({ b: 2 });
  });

  it.todo("ignores a primitive returned from the constructor");

  it.todo("passes every argument through");
});
