/**
 * The library's error hierarchy. Fill in the classes; every error should
 * extend LibraryError and have `name` set to its class name.
 */
export class LibraryError extends Error {}

export class NotFoundError extends LibraryError {}

export class DuplicateError extends LibraryError {}

export class BookUnavailableError extends LibraryError {}

export class BorrowLimitError extends LibraryError {}

export class FinesOwedError extends LibraryError {}
