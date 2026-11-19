/**
 * validateUser({ name, email, age }) — returns { name, email, age } with
 * name trimmed and age parsed. Otherwise throws an AggregateError whose
 * .errors are ValidationErrors, one per bad field:
 *   name  — required (non-blank)
 *   email — must contain "@"
 *   age   — whatever parseAge throws
 */
import { describe, it, expect } from "vitest";
import { validateUser } from "./validateUser.js";
import { ValidationError } from "./ValidationError.js";

const catchIt = (fn) => {
  try {
    fn();
  } catch (e) {
    return e;
  }
  throw new Error("expected function to throw");
};

describe("validateUser", () => {
  it("returns a cleaned user when everything is valid", () => {
    expect(validateUser({ name: "  Ada ", email: "ada@x.io", age: "36" })).toEqual({
      name: "Ada",
      email: "ada@x.io",
      age: 36,
    });
  });

  it("throws an AggregateError for invalid input", () => {
    expect(() => validateUser({ name: "", email: "ada@x.io", age: 36 })).toThrow(AggregateError);
  });

  it("reports every bad field, not just the first", () => {
    const err = catchIt(() => validateUser({ name: "", email: "nope", age: "old" }));
    expect(err.errors.map((e) => e.field)).toEqual(["name", "email", "age"]);
  });

  it("fills errors with ValidationErrors", () => {
    const err = catchIt(() => validateUser({ name: "Ada", email: "nope", age: 1 }));
    expect(err.errors).toHaveLength(1);
    expect(err.errors[0]).toBeInstanceOf(ValidationError);
  });

  // validateUser() with no argument: a TypeError from destructuring isn't a helpful error.
  it.todo("reports all three fields as invalid when called with an empty object");
});
