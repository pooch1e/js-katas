# 08 · Scope & Closures

**Builds on:** 03, 07.

```sh
pnpm vitest language/08-scope-closures
```

A **closure** is a function plus the variables it could see when it was created. When a function returns an inner function, the inner one keeps access to the outer function's variables, even after the outer function has finished. That lets you build private state without classes.

## Key ideas

- **Scope:** `let` and `const` are visible inside the nearest `{ }` block. `var` is visible across the whole function. (Avoid `var`. Knowing it exists is enough.)
- **Closures capture variables, not values.** If the variable changes later, the closure sees the new value.
- **Each call makes a fresh scope.** Call `makeCounter()` twice and you get two counters that don't share anything.
- **Private state:** a variable inside the outer function can't be reached from outside except through the functions you return.
- **The classic loop gotcha:** with `var i` in a `for` loop, every closure shares one `i`. With `let i`, each iteration gets its own.

```js
// A different problem: a closure that remembers a greeting
function makeGreeter(greeting) {
  return (name) => `${greeting}, ${name}`;
}
const hi = makeGreeter("Hi");
hi("Ada"); // "Hi, Ada". `greeting` lived on after makeGreeter returned.
```

---

## The katas

### makeCounter — state that survives between calls

**The concept:** a `let` variable in the outer function, and an object of small functions that read and change it.

**Building blocks:** `let count = start`, return an object literal of arrow functions.

### once — remembering whether something happened

**The concept:** a closure can remember a flag (have I run yet?) *and* a value (what did I return?).

```js
// A different problem: a function that only lets the first 3 calls through
function firstThree(fn) {
  let calls = 0;
  return (...args) => (calls++ < 3 ? fn(...args) : undefined);
}
```

**Building blocks:** two `let` variables, rest/spread to pass all arguments through.

### memoize — a private cache

**The concept:** keep a lookup table inside the closure. Before calling the slow function, check whether you've already got the answer. Be careful: "cached value is `undefined`" and "not cached" are different things.

**Building blocks:** an object or `Map` (module 11; an object is fine for now), `in` / `Object.hasOwn` / `Map.prototype.has`.

### makeIdGenerator — a closure configured by arguments

**Building blocks:** the outer function's parameters are also captured. `String.prototype.padStart`.

### createWallet — encapsulation with closures

**The concept:** the balance lives only in the closure, so the only way to change it is through the methods you choose to expose. Those methods enforce the rules.

**Building blocks:** `let balance`, guard clauses that `throw`, returning an object of methods.
