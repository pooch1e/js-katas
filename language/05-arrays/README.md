# 05 · Arrays

**Builds on:** 02–04.

```sh
pnpm vitest language/05-arrays
```

Arrays are ordered lists. In this module, **solve each kata with a plain loop first**. Then, once it's green, try a second version with built-in methods. If you can't write it as a loop, you don't really know what the method is doing.

## Key ideas

- **Mutating methods** change the array in place: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`.
- **Non-mutating methods** return something new: `slice`, `concat`, `map`, `filter`, `includes`, `indexOf`, `join`, plus `toSorted`, `toReversed`, `toSpliced` and `with`, the copy versions of the mutating ones.
- **Arrays are passed by reference.** If a function `push`es onto an array it was given, the caller's array changes too. Module 06 goes deeper.
- **Copying:** `[...arr]` or `arr.slice()` makes a *shallow* copy.
- **`slice(start, end)`**: `end` is *excluded*. A negative index counts from the end.
- **Empty arrays are truthy.** Check `arr.length === 0`, not `!arr`.

---

## The katas

### findMax — a running best

**The concept:** keep the best value seen so far, and compare each new item against it. What do you start the "best" at? (Starting at `0` is a bug. Why?)

```js
// A different problem: the longest word
function longestWord(words) {
  let longest = words[0];
  for (const w of words) if (w.length > longest.length) longest = w;
  return longest;
}
```

**Building blocks:** `for...of`, `>`, a guard for the empty case. Second pass: `Math.max(...arr)`.

### countOccurrences

**The concept:** a counter that only goes up when an item matches.

**Building blocks:** a loop, `===`. Second pass: `filter(...).length`.

### removeAt — non-mutating removal

**The concept:** build a new array from the parts *before* and *after* the index. Validate the index first.

```js
// A different problem: insert without mutating
const insertAt = (arr, i, x) => [...arr.slice(0, i), x, ...arr.slice(i)];
```

**Building blocks:** `slice`, spread, `Number.isInteger`, `throw new RangeError(...)`. Second pass: `toSpliced`.

### chunk — stepping by more than 1

**The concept:** a `for` loop's step doesn't have to be `i++`. Step by `size` and take a slice each time.

**Building blocks:** `for (let i = 0; i < arr.length; i += size)`, `slice`. `slice` happily stops at the end of the array.

### rotate — index arithmetic

**The concept:** moving every item `k` places right is the same as taking the last `k` items and putting them on the front. If `k` is bigger than the length, `%` brings it back in range.

**Building blocks:** `%`, `slice` with negative indexes, spread.

### uniq — first occurrence wins

**The concept:** keep an item only if you haven't kept it before. Module 11 shows a faster way with `Set`. Here, use arrays.

**Building blocks:** a result array, `includes`. Second pass: `filter` with `indexOf`.
