# OOP 02 · Encapsulation

```sh
pnpm vitest oop/02-encapsulation
```

Encapsulation means an object **protects its own state**. Outside code can't put it into an invalid condition, because the only way to change it is through methods that check the rules. Those rules are called **invariants**: things that must *always* be true, such as "balance is never negative" or "min ≤ target ≤ max".

## Key ideas

- **`#private` fields:** `#count = 0` is truly private. Code outside the class body can't read or write it (that's a SyntaxError), and it doesn't show up in `Object.keys` or `JSON.stringify`.
- **Private methods:** `#validate(x) {}`, helpers that aren't part of the public API.
- **Expose read access deliberately:** a getter with no setter gives read-only access.
- **Don't leak internals:** returning an internal array or object hands out a reference, and callers can mutate it. Return copies.
- **Immutability:** `Object.freeze(this)` at the end of the constructor stops *all* changes, including adding properties. "Changing" a frozen value object means returning a new one.
- **Integers for money:** store cents as a whole number. Floating point (language module 01) and money don't mix.
- **Closures did this first.** Language module 08's `createWallet` was encapsulation without classes. Same idea, different syntax.

```js
// A different problem: a class with an invariant (a volume between 0 and 10)
class Speaker {
  #volume = 5;
  get volume() { return this.#volume; }
  set volume(v) {
    if (v < 0 || v > 10) throw new RangeError("volume must be 0–10");
    this.#volume = v;
  }
}
```

---

## The katas

### Counter

**Building blocks:** `#count`, methods, a getter. The tests check that the count really can't be reached from outside.

### User — a secret that never leaves

**The concept:** the password hash is private, and there is *no* getter for it. The only things you can do with it are check a password and change the password (which needs the old one).

**Building blocks:** `#passwordHash`, a private `#hash(str)` method (a toy hash is fine; the tests don't care about crypto), and a `toJSON()` method so `JSON.stringify(user)` only includes safe fields.

### Money — an immutable value object

**Building blocks:** store integer cents, `Object.freeze(this)`, methods returning new `Money` instances, a currency check that throws when adding different currencies, a `static fromDecimal(12.34, "GBP")` factory using `Math.round`.

### Thermostat — keeping an invariant

**The concept:** `min ≤ target ≤ max` must hold after *every* operation. Setting the target outside the range clamps it. Changing the range has to validate the new range *and* re-clamp the target.

**Building blocks:** private fields, a private `#clamp` method, getters, a `setRange(min, max)` method.
