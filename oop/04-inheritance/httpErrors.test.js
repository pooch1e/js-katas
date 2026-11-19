/**
 * HttpError(status, message) — name is the class name; .status; toJSON()
 *   → { error: name, status, message }.
 * BadRequestError(message = "Bad Request")      → 400
 * UnauthorizedError(message = "Unauthorized")   → 401
 * NotFoundError(message = "Not Found")          → 404
 * HttpError.from(status, message?) → the matching subclass, or a plain
 *   HttpError for other statuses.
 */
import { describe, it, expect } from "vitest";
import { HttpError, BadRequestError, UnauthorizedError, NotFoundError } from "./httpErrors.js";

describe("HttpError family", () => {
  it("creates a base HttpError", () => {
    const e = new HttpError(418, "I'm a teapot");
    expect(e.status).toBe(418);
    expect(e.message).toBe("I'm a teapot");
    expect(e).toBeInstanceOf(Error);
  });

  it("gives subclasses fixed statuses and default messages", () => {
    const e = new NotFoundError();
    expect(e.status).toBe(404);
    expect(e.message).toBe("Not Found");
    expect(e).toBeInstanceOf(HttpError);
  });

  it("uses the class name as the error name", () => {
    expect(new UnauthorizedError().name).toBe("UnauthorizedError");
  });

  it("serialises with toJSON", () => {
    expect(JSON.parse(JSON.stringify(new BadRequestError("email missing")))).toEqual({
      error: "BadRequestError",
      status: 400,
      message: "email missing",
    });
  });

  it("builds the right subclass with from()", () => {
    expect(HttpError.from(404)).toBeInstanceOf(NotFoundError);
    expect(HttpError.from(401, "token expired").message).toBe("token expired");
  });

  it.todo("falls back to a plain HttpError for an unknown status");

  it.todo("can be caught as HttpError: expect(() => { throw new NotFoundError() }).toThrow(HttpError)");
});
