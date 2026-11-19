# 03 · Functions

**Builds on:** 01, 02.

```sh
pnpm vitest language/03-functions
```

A function is a named, reusable recipe: inputs in (parameters), output out (`return`). Getting the *shape* of a function right (what it takes, what it returns, what it touches) is most of good design.

## Key ideas

- **Three ways to write one:** `function add(a, b) {}`, `const add = function (a, b) {}`, `const add = (a, b) => a + b`. For now treat them as the same. Module 12 covers where they differ.
- **No `return` means `undefined`.** A very common bug is computing the right value and forgetting to return it.
- **Default parameters:** `function f(x = 10)`. The default is used when the argument is `undefined`, either missing or passed as `undefined`. It is *not* used for `null`.
- **Rest parameters:** `function f(first, ...others)` gathers the remaining arguments into a real array.
- **Destructured parameters:** `function f({ name, age = 0 })` pulls fields out of an object argument. Add `= {}` after the braces so calling `f()` with nothing doesn't crash.
- **Pure functions** return a result based only on their inputs and change nothing outside themselves. They are trivially testable. Mutating an argument is the most common way to accidentally make a function impure.

---

## The katas

### greet — default parameters

**The concept:** defaults let callers skip arguments. They only replace `undefined`.

```js
// A different problem
function makeTag(text, tag = "p") {
  return `<${tag}>${text}</${tag}>`;
}
makeTag("hi");          // "<p>hi</p>"
makeTag("hi", "h1");    // "<h1>hi</h1>"
```

**Building blocks:** default parameters, template literals `` `${x}` ``.

### sum — rest parameters

**The concept:** `...nums` collects any number of arguments into an array.

```js
// A different problem: log a label followed by any number of values
function logAll(label, ...values) {
  for (const v of values) console.log(label, v);
}
```

**Building blocks:** `...rest`, a loop or accumulator.

### clamp — validating arguments

**The concept:** a function should complain loudly when it's called wrongly, instead of returning nonsense. Decide what "wrong" means (here: `min > max`) and throw.

**Building blocks:** `Math.min`, `Math.max` (or plain `if`s), `throw new RangeError(...)`.

### describePizza — options objects

**The concept:** once a function has more than about three parameters, callers can't remember the order. Take a single object instead and destructure it, with defaults for each field.

```js
// A different problem
function createUser({ name, role = "viewer", active = true } = {}) {
  return { name, role, active };
}
createUser({ name: "Ada" }); // { name: "Ada", role: "viewer", active: true }
```

**Building blocks:** a destructured parameter with defaults, `= {}`, `Array.prototype.join`.

### addToCart — pure functions don't mutate

**The concept:** `cart.push(item)` changes the caller's array. Whoever passed it in now has a different array, which is a nasty surprise. A pure version returns a *new* array and leaves the input alone.

```js
// A different problem: a pure "rename" for an object
function rename(user, newName) {
  return { ...user, name: newName };   // a new object; `user` is untouched
}
```

**Building blocks:** array spread `[...arr, x]`, object spread `{ ...obj, key: value }`.
