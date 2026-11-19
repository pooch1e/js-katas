# OOP 04 · Inheritance

```sh
pnpm vitest oop/04-inheritance
```

`class Child extends Parent` sets up the prototype chain you built by hand in module 03. Child instances get the parent's methods, and can **override** them or **extend** them by calling `super.method()`.

Inheritance models an **"is-a"** relationship: a `Square` *is a* `Rectangle`, and a `NotFoundError` *is an* `HttpError`. It's powerful and easy to overuse. Module 06 covers the alternative.

## Key ideas

- **`super(...)`** must be called in a child constructor *before* you touch `this`. It runs the parent's constructor.
- **`super.method()`** calls the parent's version of a method you've overridden. Use it to *add* to the parent's behaviour rather than replace it.
- **Overriding:** define a method with the same name in the child. The chain finds the child's version first.
- **Abstract base classes:** JS doesn't have them built in, but you can fake them. `new.target` is the class `new` was actually called with, so `if (new.target === Shape) throw ...` stops people instantiating the base class directly. A base method that throws "subclass must implement" forces subclasses to override it.
- **`this.constructor.name`** is the name of the *actual* class, which is handy in a shared `toString`.
- **Static members are inherited too.** `NotFoundError.from(...)` can use a static method defined on `HttpError`.
- **The Liskov rule of thumb:** anywhere a parent works, a child should work too. If a subclass has to *disable* parent behaviour, inheritance was probably the wrong tool.

```js
// A different problem: extending behaviour with super
class Logger {
  log(msg) { return msg; }
}
class TimestampLogger extends Logger {
  log(msg) { return `[12:00] ${super.log(msg)}`; }
}
```

---

## The katas

### Shapes — an abstract base and a small hierarchy

**Building blocks:** `new.target`, a base `area()` that throws, a shared `describe()` in the base that calls `this.area()` (it works for every subclass), `Square extends Rectangle` passing `side, side` to `super`.

### Employee and Manager — `super` in constructors and methods

**Building blocks:** `super(name, salary)`, `super.describe()` inside the override, an array of reports on the manager.

### HTTP errors — an error family

**The concept:** one base class with shared behaviour (`status`, `toJSON`), and small subclasses that only fix the status code and default message. A `static from(status, message)` on the base picks the right subclass.

**Building blocks:** `extends Error`, `this.name = this.constructor.name`, default parameters in subclass constructors, a lookup table from status to class.
