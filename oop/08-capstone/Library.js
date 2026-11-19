/**
 * Library — see README.md › The spec › Library.
 */
import {
  NotFoundError,
  DuplicateError,
  BookUnavailableError,
  BorrowLimitError,
  FinesOwedError,
} from "./errors.js";

export class Library {
  constructor({ clock = { now: () => Date.now() }, notifier = { send() {} } } = {}) {
    throw new Error("TODO: implement Library");
  }

  addBook(book) {}

  addMember(member) {}

  checkout(isbn, memberId) {}

  returnBook(isbn) {}

  loansFor(memberId) {}

  overdue() {}

  search(query) {}

  on(event, listener) {}
}
