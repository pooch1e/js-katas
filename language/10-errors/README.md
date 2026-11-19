# 10 · Errors

**Builds on:** 03, 06, 08.

```sh
pnpm vitest language/10-errors
```

Errors are how a function says "I can't do what you asked." Throwing well means picking the right error **type**, writing a **message** a human can act on, and keeping the **cause** when you wrap one error in another. Catching well means only catching what you can actually handle.

Do the katas in order. Later ones use `ValidationError`.

## Key ideas

- **`throw` any value, but always throw an `Error`.** You get a stack trace and a `.message`.
- **Built-in types:** `TypeError` (wrong kind of value), `RangeError` (right kind, out of range), `SyntaxError` (e.g. bad JSON). Plain `Error` for everything else.
- **Custom errors:** `class NotFoundError extends Error {}`. Set `this.name` so logs show the right name, and add extra fields (like which field failed) as properties.
- **`instanceof`** tells you what kind of error you caught. A `catch` gets *everything*, so check before you handle, and re-throw what you don't recognise.
- **`finally`** always runs, whether the `try` block returned, threw or finished normally. Use it for cleanup.
- **`cause`:** `new Error("could not load config", { cause: err })` wraps a low-level error in a meaningful one without losing the original.
- **Testing errors:** `expect(() => fn()).toThrow(SomeClass)` or `.toThrow(/message/)`. Pass a *function*. `expect(fn())` would throw before `expect` even runs.

---

## The katas

### ValidationError — a custom error class

**The concept:** extend `Error`, call `super(message)`, then add your own fields.

```js
// A different problem
class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}
```

**Building blocks:** `class ... extends Error`, `super`, `this.name`.

### parseAge — choosing the error to throw

**The concept:** turn messy input into a clean value or a precise error. Each failure gets its own message, so the caller can tell the user what to fix.

**Building blocks:** your module 01 number-conversion skills, `Number.isInteger`, `throw new ValidationError(...)`.

### validateUser — collecting errors instead of stopping at the first

**The concept:** a form should tell you about *every* problem at once, not one per submit. Collect the errors in an array, and only throw at the end if there were any. `AggregateError` is the built-in error type that holds a list of errors.

**Building blocks:** an array of errors, `new AggregateError(errors, message)`, `try/catch` around `parseAge` to collect its error rather than let it escape.

### safeJsonParse — turning throws into values

**The concept:** sometimes it's cleaner to return a result object (`{ ok: true, value }` or `{ ok: false, error }`) than to make every caller write `try/catch`. Go and Rust work like this all the time.

**Building blocks:** `try { ... } catch (err) { ... }`, `JSON.parse`.

### withCleanup — `finally`

**The concept:** the cleanup must run whether `fn` succeeds or throws, and must not swallow `fn`'s error.

```js
// A different problem: always hide the spinner
function load() {
  showSpinner();
  try {
    return fetchStuff();
  } finally {
    hideSpinner();
  }
}
```

### loadConfig — wrapping with `cause`, and only catching what you mean to

**The concept:** catch the low-level `SyntaxError` from `JSON.parse` and throw a meaningful `ConfigError` instead, with the original attached as `cause`. Errors you don't expect must pass through untouched.

**Building blocks:** `instanceof`, `{ cause: err }`, re-throwing with `throw err`.
