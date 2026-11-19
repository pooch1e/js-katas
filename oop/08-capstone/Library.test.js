/**
 * Library — see README.md › The spec › Library. The tests below get you
 * started; the todos (and any others you think of) are yours to write.
 */
import { describe, it, expect, vi } from "vitest";
import { Library } from "./Library.js";
import { Book } from "./Book.js";
import { Member } from "./Member.js";
import {
  LibraryError,
  NotFoundError,
  DuplicateError,
  BookUnavailableError,
  BorrowLimitError,
  FinesOwedError,
} from "./errors.js";

const DAY = 24 * 60 * 60 * 1000;

function setup() {
  const clock = { time: 0, now() { return this.time; } };
  const notifier = { send: vi.fn() };
  const library = new Library({ clock, notifier });
  library
    .addBook(new Book({ isbn: "1", title: "Dune", author: "Frank Herbert" }))
    .addBook(new Book({ isbn: "2", title: "Emma", author: "Jane Austen" }))
    .addBook(new Book({ isbn: "3", title: "Persuasion", author: "Jane Austen" }))
    .addBook(new Book({ isbn: "4", title: "Neuromancer", author: "William Gibson" }))
    .addMember(new Member({ id: "ada", name: "Ada" }))
    .addMember(new Member({ id: "bo", name: "Bo", type: "premium" }));
  return { library, clock, notifier };
}

describe("Library", () => {
  describe("catalogue", () => {
    it("rejects duplicate ISBNs", () => {
      const { library } = setup();
      expect(() => library.addBook(new Book({ isbn: "1", title: "X", author: "Y" }))).toThrow(DuplicateError);
    });

    it("searches titles and authors case-insensitively", () => {
      const { library } = setup();
      expect(library.search("austen").map((b) => b.title)).toEqual(["Emma", "Persuasion"]);
    });

    it.todo("rejects duplicate member ids");
  });

  describe("checkout", () => {
    it("returns a loan due in 14 days", () => {
      const { library } = setup();
      expect(library.checkout("1", "ada")).toEqual({ isbn: "1", memberId: "ada", dueAt: 14 * DAY });
    });

    it("marks the book unavailable", () => {
      const { library } = setup();
      library.checkout("1", "ada");
      expect(() => library.checkout("1", "bo")).toThrow(BookUnavailableError);
    });

    it("enforces the borrow limit", () => {
      const { library } = setup();
      ["1", "2", "3"].forEach((isbn) => library.checkout(isbn, "ada"));
      expect(() => library.checkout("4", "ada")).toThrow(BorrowLimitError);
    });

    it.todo("throws NotFoundError for an unknown book or member");

    it.todo("refuses members who owe 5 or more with FinesOwedError");

    it.todo("lets premium members borrow more than 3");

    it.todo("emits a 'checkout' event with the loan");
  });

  describe("returns and fines", () => {
    it("charges nothing for an on-time return", () => {
      const { library, clock } = setup();
      library.checkout("1", "ada");
      clock.time = 10 * DAY;
      expect(library.returnBook("1")).toEqual({ fine: 0 });
    });

    it("charges 0.25 per day late for standard members", () => {
      const { library, clock } = setup();
      library.checkout("1", "ada");
      clock.time = 18 * DAY;
      expect(library.returnBook("1").fine).toBe(1);
    });

    it.todo("rounds partial days up");

    it.todo("charges premium members 0.10 per day");

    it.todo("adds the fine to the member and notifies them");

    it.todo("makes the book available again");

    it.todo("throws NotFoundError when returning a book that isn't on loan");
  });

  describe("reports", () => {
    it.todo("lists a member's current loans");

    it.todo("lists overdue loans");
  });

  it("names each error after its class and keeps the LibraryError base", () => {
    for (const E of [NotFoundError, DuplicateError, BookUnavailableError, BorrowLimitError, FinesOwedError]) {
      const err = new E("x");
      expect(err).toBeInstanceOf(LibraryError);
      expect(err.name).toBe(E.name);
    }
  });
});
