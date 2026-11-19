# 07 · Higher-Order Functions

**Builds on:** 03, 05, 06.

```sh
pnpm vitest language/07-higher-order-functions
```

A **higher-order function** takes a function as an argument, returns one, or both. `arr.map(fn)` is one. In this module you write your own `map`, `filter` and `reduce` from scratch, so you'll never again wonder what they do. Then you use them to build bigger tools.

**Rule for this module:** don't call the built-in `.map`, `.filter`, `.reduce`, `.sort` or `Object.groupBy` inside the kata you're implementing. Once your own version works, you can use it in later katas.

## Key ideas

- **Functions are values.** You can store them in variables, pass them in and return them.
- **Callbacks get more than the item.** The built-ins call `fn(item, index, array)`, and your versions should too.
- **`reduce` is the general one.** `map` and `filter` can both be written using `reduce`. Try it once your three are green.
- **Comparators:** `sort` takes `(a, b) => number`. Negative puts `a` first, positive puts `b` first, `0` keeps their order.

---

## The katas

### map, filter — the loop you've written 100 times, with the varying part passed in

**The concept:** look at two loops that are almost the same. The part that differs becomes a function parameter.

```js
// A different problem: a hand-written forEach. The "what to do" part is the callback.
function forEach(arr, fn) {
  for (let i = 0; i < arr.length; i++) fn(arr[i], i, arr);
}
```

**Building blocks:** a `for` loop with an index, a new result array, `push`.

### reduce — folding a list into one value

**The concept:** an accumulator starts at an initial value, and each step returns the *next* accumulator. With no initial value, the built-in uses the first item and starts from the second. On an empty array with no initial value, it throws a `TypeError`.

```js
// A different problem: building one string from many, step by step
let acc = "";
for (const word of ["a", "b", "c"]) acc = acc + word.toUpperCase();
```

**Building blocks:** `arguments.length` or a rest parameter, to tell "no initial value" apart from "initial value is `undefined`".

### groupBy — a key function decides the bucket

**The concept:** call `keyFn(item)` to find which bucket the item goes in, create the bucket if it doesn't exist yet, and push into it. It's the module 06 lookup table again, with arrays as the values.

**Building blocks:** an object, `??=` (assign only if missing), `push`.

### sortBy — comparators and not mutating

**The concept:** given a key function, build the comparator `(a, b) => ...` from it. Copy before you sort, because `.sort` mutates. Strings and numbers need different comparisons: `"10" < "9"` is `true`.

**Building blocks:** `[...arr].sort(cmp)` (you may use the built-in sort here), `localeCompare` for strings.

### pipe — functions that return functions

**The concept:** `pipe(f, g, h)` returns a *new function*. When that function is called with `x`, it runs `h(g(f(x)))`. You're returning a function that remembers `f`, `g` and `h`. Module 08 explains how it remembers them.

```js
// A different problem: a function factory
const multiplier = (factor) => (n) => n * factor;
const triple = multiplier(3);
triple(5); // 15
```

**Building blocks:** rest params, returning an arrow function, a loop (or your `reduce`!).
