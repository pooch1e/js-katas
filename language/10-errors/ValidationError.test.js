/**
 * new ValidationError(field, message) — an Error with name "ValidationError"
 * and a .field property.
 */
import { describe, it, expect } from "vitest";
import { ValidationError } from "./ValidationError.js";

describe("ValidationError", () => {
  it("is an instance of Error and of ValidationError", () => {
    const err = new ValidationError("email", "is required");
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(ValidationError);
  });

  it("has the message", () => {
    expect(new ValidationError("email", "is required").message).toBe("is required");
  });

  it("records the field", () => {
    expect(new ValidationError("email", "is required").field).toBe("email");
  });

  it("has the name 'ValidationError'", () => {
    expect(new ValidationError("email", "is required").name).toBe("ValidationError");
  });

  it.todo("can be thrown and caught with toThrow(ValidationError)");
});
