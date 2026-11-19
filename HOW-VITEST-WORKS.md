# How Vitest Works (for this repo)

Vitest finds every `*.test.js` file, runs it, and reports what passed. That's it. There's no build step: the tests import your `.js` files directly as ES modules.

## Running tests

```sh
pnpm vitest                           # watch mode, all tests (re-runs affected files on save)
pnpm vitest language/03-functions     # watch only files whose path contains this
pnpm vitest clamp                     # ...matching works on any part of the path
pnpm vitest -t "throws a RangeError"  # only tests whose *name* matches
pnpm vitest run language/03-functions # run once and exit (no watch)
```

In watch mode, press `h` for shortcuts: `f` re-runs only failures, `p` filters by filename, `t` filters by test name, and `q` quits.

## Anatomy of a test file

```js
import { describe, it, expect } from "vitest";
import { clamp } from "./clamp.js";

describe("clamp", () => {            // a group, shown as a heading in the output
  it("raises n to min", () => {      // one test case
    expect(clamp(-3, 0, 10)).toBe(0);
  });

  it.todo("works when min equals max");   // a placeholder for a test you'll write
});
```

**Focus and skip** while you work (don't leave them in):
- `it.only(...)` runs only this test in the file. `describe.only` does the same for a group.
- `it.skip(...)` skips a test.

## Reading a failure

```
AssertionError: expected 3 to be 4 // Object.is equality
 ❯ language/03-functions/sum.test.js:10:24
```

"expected **received** to be **expected**". The first value is what your code returned. The file and line number take you to the assertion.

## `console.log` works

Logs from your code and tests show in the output next to the test that produced them. It's the fastest debugger there is.

## Fake timers (async modules)

Tests for `setTimeout`/`setInterval` code use fake timers, so nothing really waits:

```js
beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

it("fires after 100ms", () => {
  const fn = vi.fn();
  setTimeout(fn, 100);
  vi.advanceTimersByTime(100);       // jump the clock forward instantly
  expect(fn).toHaveBeenCalled();
});
```

When promises are involved, use `await vi.advanceTimersByTimeAsync(ms)` so promise callbacks get a chance to run between timers.

## Spies: `vi.fn()`

`vi.fn()` makes a function that records how it was called. `vi.fn(impl)` also runs `impl`.

```js
const fn = vi.fn((x) => x * 2);
fn(3);
expect(fn).toHaveBeenCalledTimes(1);
expect(fn).toHaveBeenCalledWith(3);
expect(fn.mock.calls).toEqual([[3]]);
```

## Timeouts

`vitest.config.js` sets a 2-second timeout per test. In the dsa track, "Test timed out" usually means your algorithm is the wrong complexity (e.g. O(n²) where O(n) is needed), not that it's broken.

## Debugging with breakpoints

Put a `debugger;` statement in your code, then run:

```sh
pnpm vitest --inspect-brk --no-file-parallelism language/03-functions
```

Open `chrome://inspect` in Chrome and click **inspect** on the Node target. Execution pauses at your `debugger;` line, and you can step through and hover over variables. See the [vitest debugging guide](https://vitest.dev/guide/debugging) for editor-specific setups.
