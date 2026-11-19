# 13 · Iterators & Generators

**Builds on:** 07, 08, 11, 12.

```sh
pnpm vitest language/13-iterators-generators
```

`for...of`, spread `[...x]`, destructuring and `new Set(x)` all work on anything **iterable**, not just arrays. In this module you make your own iterables, and use generators to produce values **lazily**: only as they're asked for, which even makes infinite sequences possible.

## Key ideas

- **The iterator protocol:** an iterator is an object with a `next()` method that returns `{ value, done }`. When `done` is `true`, iteration stops.
- **The iterable protocol:** an object is iterable if it has a `[Symbol.iterator]()` method that returns an iterator. Each call should return a *fresh* iterator, so you can loop over it twice.
- **Generators** write iterators for you. `function* gen() { yield 1; yield 2; }`. Calling `gen()` runs *nothing*. It returns an iterator, and each `next()` runs the body up to the next `yield`.
- **Lazy evaluation:** a generator that loops forever is fine as long as the consumer stops asking. `[...infinite]` hangs. Taking the first 5 doesn't.
- **`yield*`** delegates to another iterable, yielding each of its values in turn.
- **`return` inside `for...of`** stops consuming. The generator is paused, never resumed, and cleaned up.

```js
// A different problem: a generator that cycles through colours forever
function* cycle(items) {
  while (true) for (const item of items) yield item;
}
const colours = cycle(["red", "green"]);
colours.next().value; // "red"
colours.next().value; // "green"
colours.next().value; // "red"
```

---

## The katas

### range — your first generator

**Building blocks:** `function*`, `yield`, a `for` loop. A negative step counts down, so the stop condition has to flip.

### Countdown — the protocol by hand, no generators

**The concept:** write a class whose `[Symbol.iterator]()` returns an object with a `next()` method. Keep the "where am I" state in the *iterator*, not in the `Countdown`, so two loops over the same countdown don't interfere.

**Building blocks:** `[Symbol.iterator]() { ... }` as a class method, returning `{ next: () => ({ value, done }) }`, a closure for the position.

### take — consuming lazily

**The concept:** pull values from *any* iterable, and stop after `n`. It has to work on infinite generators, so you must stop *before* asking for item `n + 1`.

**Building blocks:** `for...of` with an early `return`/`break`, or a generator that `yield`s.

### fibonacci — an infinite sequence

**Building blocks:** `while (true)`, two variables updated together with destructuring `[a, b] = [b, a + b]`.

### lazyMap and lazyFilter — pipelines that do no work until asked

**The concept:** module 07's `map` builds a whole new array. A lazy version is a generator that transforms one item at a time, as each one is requested. Chain them over an infinite sequence and they still work.

**Building blocks:** `function*`, `for...of` over the source, `yield`.
