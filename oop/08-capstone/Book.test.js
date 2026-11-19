/**
 * Book — see README.md › The spec › Book.
 */
import { describe, it, expect } from "vitest";
import { Book } from "./Book.js";

const valid = { isbn: "978-0", title: "Dune", author: "Frank Herbert" };

describe("Book", () => {
  it("stores its details", () => {
    const b = new Book(valid);
    expect([b.isbn, b.title, b.author]).toEqual(["978-0", "Dune", "Frank Herbert"]);
  });

  it("is available when new", () => {
    expect(new Book(valid).available).toBe(true);
  });

  it("formats with toString", () => {
    expect(`${new Book(valid)}`).toBe("Dune by Frank Herbert");
  });

  it("rejects a blank title", () => {
    expect(() => new Book({ ...valid, title: " " })).toThrow(TypeError);
  });

  it.todo("rejects a missing isbn or author");
});
