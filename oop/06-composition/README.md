# OOP 06 · Composition

```sh
pnpm vitest oop/06-composition
```

"**Favour composition over inheritance**" is one of the most repeated pieces of design advice. Inheritance says what something *is*. Composition says what something *has* or *can do*. Hierarchies get stuck when something needs behaviour from two branches: a `RobotDog` that can bark (like `Dog`) *and* recharge (like `Robot`). With composition you just plug in both.

## Key ideas

- **Has-a over is-a:** a `Car` *has an* `Engine` and delegates to it (`this.engine.start()`) rather than *being* an engine.
- **Behaviour objects / functions:** small pieces like `canWalk`, `canBark` that each add a capability, combined with `Object.assign` or spread.
- **Class mixins:** a function that takes a class and returns a *new class extending it*: `const withX = (Base) => class extends Base { ... }`. Stack several: `class Note extends withA(withB(Object)) {}`.
- **Dependency injection (DI):** don't `new` your collaborators inside a class. *Pass them in* (usually through the constructor). Then:
  - tests can pass **fakes** instead of real databases, payment providers and clocks
  - you can swap implementations without editing the class
- **Program to an interface:** `OrderService` only cares that `payments` has a `charge(amount)` method, not which payment company it is. That's polymorphism (module 05) applied to collaborators.
- **Inject time, too.** Code that calls `Date.now()` directly is hard to test. Take a `clock` with a `now()` method instead.

```js
// A different problem: injecting a logger so tests can check what was logged
class Uploader {
  constructor({ storage, logger }) {
    this.storage = storage;
    this.logger = logger;
  }
  async upload(file) {
    await this.storage.put(file.name, file.data);
    this.logger.info(`uploaded ${file.name}`);
  }
}
// in a test: new Uploader({ storage: fakeStorage, logger: { info: vi.fn() } })
```

---

## The katas

### Class mixins — withTimestamps and withSerializable

**Building blocks:** arrow functions returning `class extends Base { ... }`, calling `super(...args)` in a mixin constructor so it works with any base, an injectable `now` function for testable timestamps.

### createRobotDog — composing behaviours

**The concept:** each behaviour is a function that takes shared `state` and returns an object of methods. The factory creates the state, then merges the behaviours it wants.

**Building blocks:** `Object.assign({}, canWalk(state), canBark(state), ...)`, closures over `state`.

### OrderService — dependency injection

**The concept:** `placeOrder` coordinates four collaborators it didn't create. The tests pass fakes and check *what was called, in what order*, including the rollback when payment fails.

**Building blocks:** constructor destructuring, `async`/`await`, `try/catch` with compensation (release the reserved stock if the charge fails), custom errors.
