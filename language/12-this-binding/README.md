# 12 · `this` & Binding

**Builds on:** 03, 07, 08.

```sh
pnpm vitest language/12-this-binding
```

`this` is decided by **how a function is called**, not where it's written. That single rule explains nearly every `this` bug: "it worked as `obj.method()` but broke when I passed `obj.method` as a callback."

## Key ideas

The four call styles, from most to least common:

| Call | `this` is |
|---|---|
| `obj.method()` | `obj`, the thing before the dot |
| `fn()` (plain call) | `undefined` (in modules / strict mode) |
| `fn.call(x, a, b)` / `fn.apply(x, [a, b])` | `x`, chosen explicitly |
| `new Fn()` | the brand new object (the OOP track covers this) |

- **Detaching loses `this`.** `const m = obj.method; m()` is a plain call, so `this` is `undefined`. Passing `obj.method` to `setTimeout` or `addEventListener` does the same thing.
- **`bind`** returns a *new* function with `this` locked in permanently.
- **Arrow functions have no `this` of their own.** They use the `this` of the surrounding code. That makes them perfect for callbacks *inside* methods, and wrong *as* methods on object literals.
- **ES modules are always strict**, so a lost `this` is `undefined` (and crashes when you use it), not the global object. That's the better failure.

```js
// A different problem: why the arrow matters
const clock = {
  seconds: 0,
  startBroken() { setInterval(function () { this.seconds++; }, 1000); },  // `this` is not clock
  startFixed()  { setInterval(() => { this.seconds++; }, 1000); },        // arrow uses startFixed's this
};
```

---

## The katas

### makeRectangle — methods that use `this`

**The concept:** methods should read from `this` rather than from captured variables, so they see changes made to the object after it was created. Returning `this` from a method lets callers chain calls.

**Building blocks:** method shorthand `area() { ... }` in an object literal, `return this`.

### myCall — choosing `this` yourself

**The concept:** look back at the table. Without `call`, `apply` or `bind`, there's only one call style that lets you choose what `this` is. Your job is to make that call style happen, and to leave `thisArg` exactly as you found it.

**Building blocks:** `Symbol()` (a property key nothing else can collide with), bracket access, `delete`. Don't use `.call`, `.apply` or `.bind`.

### myBind — a function that remembers `this` and some arguments

**The concept:** return a new function that, when called, calls the original with the saved `this` and the saved arguments followed by the new ones. A closure (module 08) does the remembering.

**Building blocks:** a closure, rest/spread. You *may* use `.apply` or your `myCall` inside it.

### bindAll — fixing detached methods for good

**The concept:** go through an object's function-valued properties and replace each one with a bound version, so they still work when passed around as callbacks.

**Building blocks:** `Object.keys`, `typeof v === "function"`, `.bind`.

### createTicker — arrows inside methods

**The concept:** the ticker's `start` method sets up a `setInterval`. The callback has to update the ticker, so it needs the method's `this`. The tests use fake timers (`vi.useFakeTimers()`), which let them fast-forward time instantly.

**Building blocks:** `setInterval`, `clearInterval`, an arrow callback, a property to hold the interval id.
