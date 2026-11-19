# OOP 07 · Design Patterns

```sh
pnpm vitest oop/07-patterns
```

Design patterns are **named solutions to problems that keep coming up**. The names matter as much as the code: saying "make it an observer" or "use a strategy here" communicates a whole design in two words. You've already met some: the iterator (language 13), the composite (OOP 05), dependency injection (OOP 06).

Don't go looking for places to use patterns. Learn them so you *recognise* the problem when you meet it.

## The five in this module

| Pattern | Problem it solves | You've seen it in |
|---|---|---|
| **Observer** | many parts of the app need to react when something happens, without the source knowing who they are | DOM `addEventListener`, Node's `EventEmitter`, state stores |
| **Strategy** | several interchangeable algorithms; pick one at runtime without `if/else` chains | `arr.sort(compareFn)`, auth providers, pricing rules |
| **Command** | turn an action into an object, so it can be queued, logged or **undone** | undo/redo in editors, job queues |
| **Decorator** | add behaviour (logging, caching, retries) around something without changing it | your `memoize`, `once`, `debounce` from the language track |
| **State** | an object behaves differently depending on its state, and the allowed transitions are strict | traffic lights, order status, media players |

---

## The katas

### EventEmitter — observer

**The concept:** a `Map` from event name to a list of listeners. `emit` calls each one with the arguments. `once` wraps the listener in one that removes itself before calling the original, and `off` must still be able to remove a `once` listener by its *original* function.

**Building blocks:** `Map`, arrays, copying the listener list before you iterate (a listener might call `off` during `emit`).

### ShippingCalculator — strategy

**The concept:** each strategy is an object with `cost(order)`. The calculator holds a registry by name, and adding a new shipping method means registering a new strategy, not editing the calculator.

**Building blocks:** a `Map` of strategies, a custom error for unknown names.

### TextEditor — command with undo/redo

**The concept:** every edit is a command object with `execute(editor)` and `undo(editor)`. The editor keeps an undo stack and a redo stack. Making a *new* edit clears the redo stack, because the history has branched.

**Building blocks:** two arrays used as stacks (DSA 01), command classes that remember whatever they need to reverse themselves (e.g. the text they deleted).

### decorators — wrapping functions

**The concept:** a decorator takes a function and returns a function with the *same signature* plus extra behaviour. Because the shape is the same, decorators stack: `withLogging(withTiming(fn))`.

**Building blocks:** rest/spread, `try/finally`, an injected logger and clock (OOP 06), keeping `this` with `fn.apply(this, args)`.

### TrafficLight — state

**The concept:** each state is an object that knows what it does and what comes next. The light delegates to its current state, so there's no giant `switch`. Invalid transitions throw.

**Building blocks:** a map of state objects `{ green: { next: "yellow", canGo: true }, ... }`, or one class per state, plus a custom error.
