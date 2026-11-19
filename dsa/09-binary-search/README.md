# DSA 09 · Binary Search

```sh
pnpm vitest dsa/09-binary-search
```

If the data is **sorted** (or the answers are **monotonic**: false, false, false, true, true…), you can throw away half the remaining candidates with every check. A million items takes about 20 steps. The idea is simple, and getting the boundaries exactly right is notoriously fiddly. That's what this module drills.

Several tests here **count how many times you read the array** (using a `Proxy`). A linear scan fails them even though it gives the right answer.

## Key ideas

- **The loop invariant:** decide what `lo` and `hi` *mean* and keep it true on every iteration. For example, "the answer, if it exists, is in `[lo, hi]`". Most binary search bugs are an invariant that's half one convention and half another.
- **Two common shapes:**
  - `while (lo <= hi)` with `hi = mid - 1` / `lo = mid + 1`, for *finding an exact match*.
  - `while (lo < hi)` with `hi = mid` / `lo = mid + 1`, for *finding a boundary* (the first true). Ends with `lo === hi` on the answer.
- **mid:** `Math.floor((lo + hi) / 2)`, or `lo + ((hi - lo) >> 1)`.
- **Infinite loops** happen when an update can leave `lo`/`hi` unchanged (e.g. `lo = mid` when `mid === lo`). Trace a 2-element case by hand.
- **Binary search on the answer:** sometimes there's no array at all. You search a *range of possible answers* for the boundary where a condition flips, as in `sqrtFloor`.

```js
// A different problem: the first day the plant is taller than 50cm, given height(day) only ever grows
let lo = 0, hi = 365;
while (lo < hi) {
  const mid = Math.floor((lo + hi) / 2);
  if (height(mid) > 50) hi = mid; else lo = mid + 1;
}
```

---

## The katas

### binarySearch — exact match

**Building blocks:** `lo`, `hi`, `mid`, the `<=` loop shape.

### searchInsert — where would it go?

**The concept:** when the target isn't present, the loop still ends somewhere meaningful. Work out where `lo` finishes.

### firstBadVersion — find the boundary

**Building blocks:** the `lo < hi` shape. You can only call `isBad(v)`, and the tests count how many times.

### searchRotated — sorted, but rotated

**The concept:** `[4,5,6,7,0,1,2]`. Split it at any `mid` and *at least one half is properly sorted*. Check which one, then check whether the target lies within that sorted half's range. That tells you which half to keep.

### sqrtFloor — searching the answer space

**The concept:** the answer is in `[0, x]`. For a candidate `m`, is `m * m <= x`? That's monotonic. Find the *last* `m` where it's true. (No `Math.sqrt`, no `**`.)
