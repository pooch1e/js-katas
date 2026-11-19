# OOP 03 · Prototypes

```sh
pnpm vitest oop/03-prototypes
```

JS doesn't really have classes underneath. It has **prototypes**. Every object has a hidden link to another object, its prototype. When you read a property that the object doesn't have, JS follows the link and looks there, then at *that* object's prototype, and so on up the **prototype chain** until it reaches `null`.

`class` is (mostly) syntax for setting up those links. In this module you do it by hand, so `class`, `new`, `instanceof` and `extends` stop being magic.

## Key ideas

- **`Object.getPrototypeOf(obj)`** reads the link. **`Object.create(proto)`** makes a new object whose link points at `proto`.
- **Constructor functions** were the pre-`class` way: `function Dog(name) { this.name = name; }` plus methods on `Dog.prototype`. `new Dog("Rex")` makes an object linked to `Dog.prototype`.
- **What `new F(...args)` does:**
  1. Create an empty object linked to `F.prototype`.
  2. Call `F` with `this` set to that object.
  3. If `F` returned an *object*, use that. Otherwise use the new object.
- **What `obj instanceof F` does:** walks `obj`'s prototype chain, looking for `F.prototype`.
- **Shared vs own:** methods live once on the prototype and are shared. Data lives on each instance ("own" properties). `Object.hasOwn(obj, key)` tells them apart.
- **Shadowing:** setting `obj.x` always creates an *own* property, even if the prototype has an `x`. The prototype's `x` is hidden, not changed.

```js
// A different problem: a shared default, shadowed per object
const defaults = { theme: "light", fontSize: 14 };
const prefs = Object.create(defaults);
prefs.theme = "dark";
prefs.theme;      // "dark" (own)
prefs.fontSize;   // 14 (found on the prototype)
```

---

## The katas

### Person — a constructor function, no `class`

**Building blocks:** `function Person(name, age) { ... }`, `Person.prototype.greet = function () { ... }` (not an arrow, because it needs `this`).

### myNew — implement `new`

**Building blocks:** `Object.create(Ctor.prototype)`, `Ctor.apply(obj, args)`, a check on the return value's type (objects *and* functions count as "an object" here).

### myInstanceOf — implement `instanceof`

**Building blocks:** a loop with `Object.getPrototypeOf`, stopping at `null`. Primitives are never instances.

### extend — inheritance by hand

**The concept:** make `Child.prototype` an object linked to `Parent.prototype`, then fix `Child.prototype.constructor`, which the replacement wiped out. Inside `Child` itself, calling `Parent.call(this, ...)` is the hand-written `super(...)`.

**Building blocks:** `Object.create`, `Object.defineProperty` (so `constructor` is non-enumerable, matching the built-in).

### createAnimal — `Object.create` with a shared prototype

**The concept:** no constructor at all. A plain object holds the shared methods, and a factory function links each new animal to it.
