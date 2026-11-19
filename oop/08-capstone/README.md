# OOP 08 · Capstone: Library System

```sh
pnpm vitest oop/08-capstone
```

A small library system that pulls the whole track together: classes with invariants (01–02), an error hierarchy (04), polymorphic fine rules (05), injected collaborators (06) and an observer (07). It also leans on the language track: Map/Set, errors, closures.

This one is different from the earlier modules:

- **More than half the tests are `it.todo`.** The spec below is the source of truth, and writing the tests is the main exercise.
- **You decide the internals.** The stubs only fix the public API. Private fields, helper classes and how you store loans are up to you.
- **Work outside-in.** Get `Book` and `Member` green first, then build `Library` one rule at a time, writing the test before the code each time.

## The spec

### Book

`new Book({ isbn, title, author })`
- `isbn`, `title` and `author` are required non-blank strings (`TypeError` otherwise).
- `available` getter: `true` unless currently on loan.
- `toString()` → `"<title> by <author>"`.

### Member

`new Member({ id, name, type = "standard" })`
- `type` is `"standard"` or `"premium"` (`TypeError` otherwise).
- `borrowLimit` getter: 3 for standard, 10 for premium.
- `fines` getter: the outstanding fine total (starts at 0).
- `payFine(amount)`: reduces fines. Paying more than is owed is a `RangeError`, as is a non-positive amount.

### Library

`new Library({ clock = { now: () => Date.now() }, notifier = { send() {} } } = {})`

- `addBook(book)`, `addMember(member)`: return `this`. Adding a duplicate ISBN or member id throws `DuplicateError`.
- `checkout(isbn, memberId)` → loan `{ isbn, memberId, dueAt }`, where `dueAt` = now + 14 days. Throws:
  - `NotFoundError` for an unknown book or member
  - `BookUnavailableError` if the book is already on loan
  - `BorrowLimitError` if the member is at their limit
  - `FinesOwedError` if the member owes 5 or more
- `returnBook(isbn)` → `{ fine }`. A late return adds a fine to the member: **0.25 per day late** for standard members, **0.10** for premium (days rounded *up*). If the fine is above 0, call `notifier.send(memberId, "Fine charged: <fine>")`. Throws `NotFoundError` if the book isn't on loan.
- `loansFor(memberId)` → array of the member's current loans.
- `overdue()` → array of loans whose `dueAt` is before now.
- `search(query)` → books whose title or author contains `query`, case-insensitive.
- `on("checkout" | "return", listener)`: listeners receive the loan object. Use your EventEmitter from module 07 (import it, or write a small one).

All the errors extend a shared `LibraryError` base class.

## Suggested order

1. `Book` and `Member` (tests mostly written).
2. `Library.addBook` / `addMember` / `search`.
3. `checkout` and its four failure cases.
4. `returnBook` and fines. Inject the clock and move time forward in tests.
5. `overdue`, `loansFor`, events, notifications.
6. Refactor. Could fine rules be **strategies** keyed by member type, so a new member type needs no `if`?
