# 14 · Async I: Callbacks, Promises & the Event Loop

**Builds on:** 07, 08, 10, 12.

```sh
pnpm vitest language/14-async-basics
```

JS runs your code on **one thread**. When something slow happens, like a timer or a network request, JS doesn't wait. It registers a callback and moves on. A **Promise** is an object standing in for a value that will arrive later. `async`/`await` is syntax that makes promise code read top to bottom.

## Key ideas

- **The event loop, in short:**
  1. Run all the synchronous code to the end.
  2. Run every **microtask** (promise `.then` callbacks, code after an `await`, `queueMicrotask`) until that queue is empty, including microtasks queued *by* microtasks.
  3. Run **one** macrotask (a `setTimeout` callback, I/O), then go back to step 2.

  So `setTimeout(fn, 0)` always runs *after* any already-resolved promise callbacks.
- **Promise states:** pending → fulfilled (with a value) or rejected (with a reason). Once settled, a promise never changes.
- **`new Promise((resolve, reject) => { ... })`**: the function you pass runs *immediately and synchronously*. Only the `.then` callbacks are async.
- **`.then` returns a new promise**, so you can chain. Returning a promise from inside a `.then` makes the chain wait for it.
- **`async` functions always return a promise.** `await x` pauses *that function only* and resumes it in a microtask.
- **Errors:** a `throw` inside an async function rejects its promise. `try/catch` around `await` catches it.
- **Testing async code:** make the test `async` and `await` things. `await expect(promise).rejects.toThrow(X)` checks a rejection. With fake timers, use `await vi.advanceTimersByTimeAsync(ms)` so promise callbacks get to run too.

---

## The katas

### predictions — reading the event loop

**The concept:** `snippets.js` contains five small programs that log in some order. **Without running them**, write down the order you expect in `predictions.js`. The tests run the real snippets and compare. If you're wrong, work out *why* before changing your answer. That's the whole point of the kata.

### delay — wrapping a callback API in a Promise

**The concept:** `setTimeout` takes a callback. To make it awaitable, create a promise and call `resolve` from inside the callback.

```js
// A different problem: wait for the next click
const nextClick = (el) => new Promise((resolve) => el.addEventListener("click", resolve, { once: true }));
```

**Building blocks:** `new Promise`, `setTimeout`.

### promisify — converting any Node-style function

**The concept:** Node's classic callback style is `fn(...args, (err, result) => {})`. `promisify` takes such a function and returns a version that returns a promise instead: reject if `err` is set, resolve with `result` otherwise.

**Building blocks:** returning a function (module 07), rest/spread, `new Promise`, calling `fn` with your own callback added on the end.

### sequence — one at a time, in order

**The concept:** `await` inside a `for` loop runs tasks one after another. (Putting `await` inside `.forEach` does *not* do that. Try it and see.)

**Building blocks:** `async function`, `for...of`, `await`, a results array.

### withTimeout — racing two things

**The concept:** create a second promise that rejects after `ms`, and settle with whichever finishes first. Clean up the timer when the real promise wins, or Node keeps a timer alive for nothing.

**Building blocks:** `new Promise`, `setTimeout`, `clearTimeout`, `.then(onOk, onErr)` or `.finally`. You can use `Promise.race`, but writing it with one `new Promise` and two flags teaches more.
