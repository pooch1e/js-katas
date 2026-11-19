# 06 · Objects

**Builds on:** 03, 05.

```sh
pnpm vitest language/06-objects
```

Objects are key/value bags. They're used both as **records** (`{ name, age }`) and as **lookup tables** (`{ apple: 3, pear: 1 }`). This module also covers the most important idea in the language track: **variables hold references to objects, not copies of them.**

## Key ideas

- **Dot vs bracket access:** `obj.name` when you know the key while writing the code, `obj[key]` when the key is in a variable.
- **Missing keys are `undefined`**, not an error. But `undefined.x` *is* an error, which is what optional chaining `obj?.a?.b` guards against.
- **Iterating:** `Object.keys(obj)`, `Object.values(obj)`, `Object.entries(obj)` (pairs of `[key, value]`). Going back: `Object.fromEntries(pairs)`.
- **`key in obj`** vs `obj[key] !== undefined`: they differ when a key exists but holds `undefined`. `Object.hasOwn(obj, key)` is the strict version.
- **References:** `const b = a` doesn't copy. `a` and `b` are two names for *one* object. Change one and you've changed "both".
- **Shallow copies:** `{ ...obj }` copies the top level only. Nested objects are still shared. So to update something deep without mutation, you have to spread at every level you change.
- **`toEqual` vs `toBe`** in tests: `toBe` asks "is this the same object?" and `toEqual` asks "does it look the same?"

---

## The katas

### wordCount — an object as a lookup table

**The concept:** use the item as the key and a count as the value. The first time you see a key, its value is `undefined`, so you need a fallback.

```js
// A different problem: total spend per customer
const totals = {};
for (const { customer, amount } of orders) {
  totals[customer] = (totals[customer] ?? 0) + amount;
}
```

**Building blocks:** `split`, `toLowerCase`, bracket access, `??`.

### invert — keys become values

**Building blocks:** `Object.entries`, a loop, or `Object.fromEntries` with `map`.

### pick and omit — building a new object from some keys

**The concept:** you're constructing a new object, so start with `{}` and copy across only what you want. `omit` is the mirror image of `pick`.

**Building blocks:** `for...of` over the keys, `Object.hasOwn`, `Object.entries` + `filter` + `Object.fromEntries`.

### getPath — walking into nested data

**The concept:** `"user.address.city"` is a list of keys. Step one key at a time, and stop safely when you hit `undefined` or `null`.

```js
// A different problem: walking an array of indexes into nested arrays
let current = grid;
for (const i of [2, 0]) current = current?.[i];
```

**Building blocks:** `split(".")`, a loop that reassigns `current`, `?.`, a fallback when the result is `undefined`.

### updateCity — immutable nested update

**The concept:** to change `user.address.city` without mutating anything, you make a new `user` containing a new `address` containing the new city. Everything you *didn't* touch can be shared.

```js
// A different problem: toggle a setting two levels deep
const next = { ...state, settings: { ...state.settings, darkMode: true } };
```

**Building blocks:** object spread at each level.
