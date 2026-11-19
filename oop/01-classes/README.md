# OOP 01 · Classes

```sh
pnpm vitest oop/01-classes
```

A class is a blueprint. `new Point(1, 2)` builds an object from it, runs `constructor` to set it up, and gives it access to the methods defined in the class body.

## Key ideas

- **`constructor(...)`** runs once per `new`. Set up fields on `this` there, and validate arguments there too, so an invalid object can never exist.
- **Methods** are shared by every instance (they live on the prototype, as module 03 shows), so defining them doesn't cost memory per object.
- **Getters and setters:** `get area() {}` lets callers write `shape.area` (no parentheses) for something *computed*. `set celsius(v) {}` runs code when someone assigns.
- **`static`** members belong to the class itself, not to instances: `Point.origin()`, `Temperature.fromFahrenheit(212)`. They're often used as alternative constructors ("factory methods").
- **`toString()`** controls how the object looks in a template literal or string concatenation.
- **Returning `this`** from a method allows chaining: `account.deposit(10).withdraw(5)`.
- **Methods that return new instances** instead of mutating (`point.add(other)` returns a *new* `Point`) make objects behave like values. That's safer to share.

```js
// A different problem: a class with validation, a getter, a static factory and toString
class Duration {
  constructor(seconds) {
    if (seconds < 0) throw new RangeError("negative duration");
    this.seconds = seconds;
  }
  get minutes() { return this.seconds / 60; }
  static fromMinutes(m) { return new Duration(m * 60); }
  toString() { return `${this.seconds}s`; }
}
```

---

## The katas

### Point — a value-like class

**Building blocks:** constructor fields, methods that return `new Point(...)`, `Math.hypot`, a `static` factory, `toString`, an `equals` method (two points with the same coordinates are equal even if they're different objects).

### Temperature — getters and setters

**The concept:** store *one* source of truth (Celsius) and compute the other units. A setter for Fahrenheit converts and stores Celsius. Callers can't tell which one is "real", and that's abstraction.

**Building blocks:** `get`/`set` pairs, a `static fromFahrenheit`, validation against absolute zero (−273.15 °C) in the setter.

### BankAccount — validation and history

**Building blocks:** constructor validation, chainable methods, a custom error (`InsufficientFundsError`), a statement array, and a getter returning a *copy* of it.
