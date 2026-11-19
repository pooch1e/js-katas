# OOP 05 · Polymorphism

```sh
pnpm vitest oop/05-polymorphism
```

**Polymorphism** means "many shapes": different objects answer the same method call in their own way. The calling code just says `shape.area()` and doesn't care *which* shape it has. That's what lets you add a new shape later without touching the code that uses shapes.

## Key ideas

- **Replace `switch (type)` with a method.** If you find yourself writing `if (x.type === "circle") ... else if (x.type === "square") ...` in several places, each branch probably belongs as a method on its own class.
- **Duck typing:** JS doesn't check types. If it has an `area()` method, you can treat it as a shape, whether or not it extends anything. "If it walks like a duck…"
- **Composite pattern:** a container node (a paragraph) and a leaf node (some text) share an interface (`render()`), so a container can render its children without knowing what they are. Recursion through polymorphism.
- **Built-in protocols are polymorphism too.** JS calls *your* methods when it needs to:
  - `toString()` for string conversion
  - `valueOf()` for maths and `<` / `>` comparisons
  - `[Symbol.toPrimitive](hint)`, which takes priority over both. `hint` is `"string"`, `"number"` or `"default"`.
  - `toJSON()` for `JSON.stringify`
  - `[Symbol.iterator]()` for `for...of` and spread (language module 13)

```js
// A different problem: a class that plugs into built-in protocols
class Celsius {
  constructor(deg) { this.deg = deg; }
  valueOf() { return this.deg; }              // new Celsius(30) > new Celsius(20) → true
  toString() { return `${this.deg}°C`; }       // `${new Celsius(30)}` → "30°C"
}
```

---

## The katas

### totalArea — one call, many shapes

**The concept:** sum `area()` over a list of shapes. The tests include a shape class *you've never seen* (defined in the test file). If your code works for it untouched, it's polymorphic.

**Building blocks:** `reduce` or a loop. No `instanceof` and no `switch`.

### Document nodes — the composite pattern

**The concept:** `Text`, `Bold`, `Link` and `Paragraph` all have `render()` (to HTML) and `plainText()`. Containers hold children and render them by calling `render()` on each one, never checking their type.

**Building blocks:** a small base class or none at all (duck typing), `map(...).join("")`, escaping `<`, `>`, `&` in text.

### Duration — plugging into JS's own protocols

**Building blocks:** `[Symbol.toPrimitive](hint)`, `toJSON`, a `static parse("1h 30m")`, `Math.floor` and `%` for formatting.

### notifyAll — duck typing with failure handling

**The concept:** anything with a `send(message)` method is a channel. Send to every channel, and don't let one failure stop the others. Collect the results.

**Building blocks:** `for...of`, `try/catch` per channel, `typeof channel.send === "function"`, `channel.constructor.name` or a `name` property for reporting.
