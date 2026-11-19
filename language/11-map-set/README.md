# 11 · Map & Set

**Builds on:** 05, 06, 08.

```sh
pnpm vitest language/11-map-set
```

Plain objects and arrays can do everything `Map` and `Set` do, but slowly or awkwardly. A `Set` answers "have I seen this?" instantly. A `Map` is a lookup table with no surprises: any key type, a real `.size`, and guaranteed insertion order.

## Key ideas

- **`Set`:** `new Set(iterable)`, `.add`, `.has`, `.delete`, `.size`. Values are unique (by SameValueZero, which is `===` except `NaN` equals `NaN`). `[...set]` converts back to an array.
- **`Map`:** `new Map()`, `.set(k, v)`, `.get(k)`, `.has(k)`, `.delete(k)`, `.size`. Keys can be *anything*: numbers stay numbers, and objects are compared by reference.
- **Iteration order is insertion order** for both. That's a feature you'll use in the LRU cache.
- **Speed:** `arr.includes(x)` checks items one by one (O(n)). `set.has(x)` is effectively instant (O(1)). With a loop around it, that's the difference between O(n²) and O(n). The dsa track covers the notation.
- **When to use an object instead:** fixed, known string keys (a record like `{ name, age }`), or when you need JSON.

---

## The katas

### union, intersection, difference — set operations

**The concept:** build a `Set` from one array so membership checks are instant, then walk the other.

```js
// A different problem: which of today's visitors are new?
const seenBefore = new Set(yesterday);
const newcomers = today.filter((v) => !seenBefore.has(v));
```

**Building blocks:** `new Set(arr)`, `.has`, `filter`, spread. Return arrays, without duplicates.

### firstRepeated — the "seen set" pattern

**The concept:** walk once, and before adding each item to a `seen` set, check whether it's already there. This pattern comes up constantly in interviews.

**Building blocks:** `new Set()`, `.has`, `.add`, early return.

### hasPairWithSum — trading memory for speed

**The concept:** for each number `n`, the partner you need is `target - n`. If you've *already seen* that partner, you're done. One pass, no nested loop.

**Building blocks:** the seen set again.

### groupAnagrams — a Map with a computed key

**The concept:** "listen" and "silent" are anagrams because they have the same letters. Sorting the letters gives both the same key (`"eilnst"`). Group by that key.

**Building blocks:** `[...word].sort().join("")`, a `Map` from key to array, `[...map.values()]`.

### LRUCache — insertion order as a feature

**The concept:** a Least Recently Used cache holds at most `capacity` items. When it's full, it throws out the item that was used longest ago. A `Map` remembers insertion order, and its *first* key is the oldest. To mark a key as "just used", delete it and set it again, which moves it to the end.

**Building blocks:** a `class` with a `Map` field (a quick look ahead to OOP: `constructor`, `this.cache = new Map()`), `map.keys().next().value` to get the oldest key.
