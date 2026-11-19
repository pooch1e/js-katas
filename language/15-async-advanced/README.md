# 15 · Async II: Building the Tools

**Builds on:** 14 (and nearly everything before it).

```sh
pnpm vitest language/15-async-advanced
```

Now you build the async tools you've been using: `Promise.all`, a concurrency pool, retry with backoff, debounce and throttle. The finale is a Promise implementation of your own. This is where closures, `this`, errors and the event loop all come together.

**Rule:** don't use the built-in that you're re-implementing (`Promise.all` inside `promiseAll`, and so on). In `MyPromise`, don't use the native `Promise` at all.

## Key ideas

- **Counting completions:** with many promises in flight, they finish in any order. Store each result *by index*, and count how many have finished to know when you're done.
- **Settling twice does nothing.** Once a promise has resolved or rejected, more calls to `resolve`/`reject` are ignored. Your code can rely on that, and your `MyPromise` must implement it.
- **Concurrency limit:** start `limit` tasks, and each time one finishes, start the next. That's a "worker" pattern.
- **Exponential backoff:** wait `base`, then `base × 2`, then `base × 4`… between retries, so you don't hammer a failing service.
- **Debounce vs throttle.** Debounce: "wait until they stop", like search-as-you-type. Throttle: "at most once per window", like a scroll handler.
- **Fake timers** in tests: `vi.advanceTimersByTime(ms)` fires timers synchronously. Use the `Async` variant when promises are involved.

---

## The katas

### promiseAll

**The concept:** the inputs finish in any order, but the output must match the input order. And you need some way of knowing when the *last* one has finished. Where does each result go, and how do you know when you're done?

**Building blocks:** `new Promise`, the index from `forEach`, `Promise.resolve(x)` to treat plain values as promises. Watch out for the empty input.

### promiseRace

**Building blocks:** the first settle wins, and later ones are ignored for free.

### pool — limited concurrency

**The concept:** like `promiseAll`, but tasks are *functions* (so they don't start until you call them), and at most `limit` run at once.

**Building blocks:** a `next` index shared by several "worker" loops, `async`/`await`, results stored by index. `Array.from({ length: limit }, worker)` then await them all (your own `promiseAll` works).

### retry — backoff

**Building blocks:** a loop with `try/await/catch`, your `delay` from module 14 (or `setTimeout` in a promise), `2 ** attempt`. Rethrow the *last* error when you run out of attempts.

### debounce

**The concept:** every call cancels the pending timer and starts a new one. Only when the calls stop for `ms` does `fn` actually run, with the *latest* arguments.

**Building blocks:** a closure holding the timer id, `clearTimeout`, `setTimeout`. A `function` (not an arrow) wrapper, so you can pass `this` through.

### throttle

**The concept:** run immediately, then ignore calls until `ms` has passed.

**Building blocks:** a closure holding a "cooling down" flag, cleared by a `setTimeout`.

### MyPromise — the finale

**The concept:** a promise is a state machine (`pending` → `fulfilled` | `rejected`) plus a list of callbacks waiting for it to settle. `then` returns a **new** `MyPromise` whose result comes from running the callback. Callbacks always run asynchronously (in a microtask), even if the promise is already settled. If a callback returns a thenable, the new promise must *adopt* its state.

Build it in test order: the executor, then `then` with already-resolved values, then pending ones, then chaining, then errors, then adoption.

**Building blocks:** a class, `this.state`, `this.value`, an array of handlers, `queueMicrotask`, `try/catch` around the executor and the callbacks, `typeof x?.then === "function"`.
