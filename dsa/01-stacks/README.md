# DSA 01 · Stacks

```sh
pnpm vitest dsa/01-stacks
```

A **stack** is last in, first out (LIFO), like a stack of plates. You can only touch the top. That sounds limiting, but "the most recent unfinished thing" is exactly what you need for matching brackets, undo, the browser back button and the call stack itself.

## Key ideas

- **Operations:** `push` (add to the top), `pop` (remove from the top), `peek` (look at the top). All three are O(1).
- **An array is already a stack:** `push` and `pop` at the end are O(1). Wrapping it in a class *restricts* what you can do, and that's the point: no reaching into the middle.
- **Hide the storage:** use a `#private` field so callers can't bypass the rules. (The OOP track goes deeper on this. For now, `#items` works like a normal field you can only reach from inside the class.)
- **The monotonic stack:** keep a stack whose values are always increasing (or decreasing). When a new item breaks the order, pop until it doesn't. Each pop answers a question about the popped item. It turns many O(n²) "look ahead for the next bigger thing" problems into O(n).

---

## The katas

### Stack

**Building blocks:** `class`, `#items = []`, a `get size()` getter. `pop` and `peek` on an empty stack return `undefined`.

### isBalanced

**The concept:** every closer must match the *most recent unmatched* opener. "Most recent" means a stack.

```js
// A different problem: are HTML-ish tags properly nested?
// For "<b><i></i></b>": push "b", push "i", "/i" matches top "i" so pop, "/b" matches "b" so pop. Empty at the end means valid.
```

**Building blocks:** your `Stack`, a lookup object from closer to opener, a check at the end.

### evaluateRpn

**The concept:** Reverse Polish Notation puts operators *after* their operands: `3 4 +` means `3 + 4`. Numbers go on a stack. An operator pops two, applies itself, and pushes the result. Order matters for `-` and `/`: the *first* pop is the right-hand side.

**Building blocks:** `split(" ")`, `Number`, `Math.trunc` for integer division, a `switch`.

### MinStack — O(1) min

**The concept:** scanning for the min is O(n). Instead, store extra information *with each push*: what the min was at that moment. When you pop, the old min comes back for free.

**Building blocks:** a second stack (or push pairs).

### dailyTemperatures — the monotonic stack

**The concept:** for each day, how many days until it's warmer? Keep a stack of *indexes* of days still waiting for a warmer day. Each new day pops every colder day off the stack and answers them.

**Building blocks:** a result array filled with 0, a stack of indexes, `while (stack.length && ...)`.
