# DSA 08 · Sorting

```sh
pnpm vitest dsa/08-sorting
```

You'll call `arr.sort()` for the rest of your career. Write these four once, so you know what it costs and why some sorts are dramatically faster than others.

**Rule:** don't call `.sort()` or `.toSorted()` in this module. Every function takes an optional comparator `(a, b) => number` (default: numbers ascending) and returns a **new** array, leaving the input alone.

`sortCases.js` holds the shared tests every sort must pass. Each test file runs them, then adds tests specific to that algorithm.

## Key ideas

| Sort | Time (typical) | Stable? | Idea |
|---|---|---|---|
| Bubble | O(n²) | yes | swap neighbours that are out of order; repeat until a pass makes no swaps |
| Insertion | O(n²), but O(n) on nearly sorted data | yes | grow a sorted prefix; slide each new item back into place |
| Merge | O(n log n) always | yes | split in half, sort each half recursively, merge the two sorted halves |
| Quick | O(n log n) average, O(n²) worst | no | pick a pivot; partition into less / equal / greater; recurse |

- **Stable** means equal items keep their original relative order. That matters when you sort by one field after another.
- **Why O(n log n):** merge sort halves the problem log n times, and each level does O(n) merging work.
- **Quick sort's worst case** comes from bad pivots. Always choosing the first item, on already-sorted input, gives O(n²). A middle or random pivot avoids it.

---

## The katas

### bubbleSort

**Building blocks:** a copy, nested loops, a `swapped` flag so already-sorted input finishes in one pass.

### insertionSort

**The concept:** like sorting a hand of cards. Take the next card and slide it left past every larger card.

```js
// A different problem: inserting one value into an already-sorted array
function insertSorted(sorted, x) {
  let i = sorted.length;
  while (i > 0 && sorted[i - 1] > x) i--;
  return [...sorted.slice(0, i), x, ...sorted.slice(i)];
}
```

### mergeSort

**The concept:** the base case is length ≤ 1 (already sorted). The heart of it is `merge(left, right)`: two indexes walking two sorted arrays, always taking the smaller head. Take from the *left* on ties, which is what makes it stable.

### quickSort

**Building blocks:** a pivot from the middle, three arrays (`less`, `equal`, `greater`), recursion on `less` and `greater`. (The in-place Lomuto/Hoare partition is a good stretch goal.)
