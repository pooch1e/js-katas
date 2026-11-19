# DSA 04 · Hash Tables

```sh
pnpm vitest dsa/04-hash-tables
```

`Map`, `Set` and plain objects are all hash tables. In this module you build one, to see where the O(1) comes from and when it stops being O(1). Then you use `Map`/`Set` to solve problems that would be O(n²) without them.

## Key ideas

- **Hash function:** turns a key into a number. `index = hash(key) % capacity` picks a bucket in an array. The same key must always give the same index.
- **Collisions:** two keys can land in the same bucket. **Separate chaining** stores a small list of `[key, value]` pairs in each bucket and searches it.
- **Load factor** = `size / capacity`. As it rises, the chains get longer and lookups slow down. When it passes a threshold (0.75 is common), **resize**: allocate double the buckets and re-insert everything, because every index changes.
- **Amortised O(1):** a resize is O(n), but it happens so rarely that the average cost per insert is still O(1).
- **A simple string hash:** walk the characters, `h = (h * 31 + charCode) >>> 0`. The `>>> 0` keeps it a positive 32-bit integer.

---

## The katas

### HashTable — build your own Map

**The concept:** an array of buckets, where each bucket is an array of `[key, value]` pairs. `set` finds the bucket and either updates an existing pair or pushes a new one. After a new insert, check the load factor.

```js
// A different problem: a bookshelf sorted into 26 bins by the title's first letter.
// Finding a book means: pick the bin (fast), then scan that one small bin.
const bin = title.toLowerCase().charCodeAt(0) - 97;
```

**Building blocks:** `Array.from({ length: n }, () => [])`, a `#hash(key)` method on `String(key)`, `findIndex` within a bucket, a `#resize()` method.

### twoSum — value to index

**The concept:** like `hasPairWithSum` from language module 11, but now you need the *indexes*, so store `value → index` in a `Map`.

### firstUniqueChar — counting, then scanning

**The concept:** two passes. Count everything first, then walk again in the original order to find the first with count 1.

### longestConsecutive — O(n) without sorting

**The concept:** sorting would be O(n log n). Instead, put everything in a `Set`. A number starts a run only if `n - 1` *isn't* in the set. From each run start, count upwards. Every number is visited at most twice, so it's O(n).

**Building blocks:** `new Set(nums)`, `.has`, a `while` loop counting up.
