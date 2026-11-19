/**
 * Person(name, age) — called with new. Instances have own name/age;
 * greet() → "Hi, I'm <name>" and birthday() (increments age, returns it)
 * live on Person.prototype. Don't use the class keyword.
 */
import { describe, it, expect } from "vitest";
import { Person } from "./Person.js";

describe("Person", () => {
  it("creates instances with own data", () => {
    const p = new Person("Ada", 36);
    expect(p.name).toBe("Ada");
    expect(Object.hasOwn(p, "age")).toBe(true);
  });

  it("greets", () => {
    expect(new Person("Ada", 36).greet()).toBe("Hi, I'm Ada");
  });

  it("puts methods on the prototype, not on each instance", () => {
    const a = new Person("Ada", 36);
    const b = new Person("Bo", 5);
    expect(Object.hasOwn(a, "greet")).toBe(false);
    expect(a.greet).toBe(b.greet);
  });

  it("works with new without being written as a class", () => {
    expect(new Person("Bo", 5).greet()).toBe("Hi, I'm Bo");
    expect(Person.toString().startsWith("class")).toBe(false);
  });

  it.todo("has birthday() increment the age and return it");

  it.todo("lets a method added to Person.prototype later appear on existing instances");
});
