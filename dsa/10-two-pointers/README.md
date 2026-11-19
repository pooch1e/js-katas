# DSA 10 · Two Pointers & Sliding Window

```sh
pnpm vitest dsa/10-two-pointers
```

Lots of "check every pair" or "check every subarray" problems look like O(n²) or worse. Two indexes moving through the array *in a coordinated way* often bring them down to O(n). The trick is to find a rule that tells you which pointer can safely move.

## Key ideas

- **Opposite ends:** `left = 0`, `right = n - 1`, moving inwards. This works on **sorted** data. If the sum is too big, the only way to shrink it is to move `right` left, and vice versa. Each step rules out a whole row of pairs.
- **Same direction (fast/slow):** `slow` marks where the next "kept" item goes and `fast` scans ahead. That's how in-place filtering works with O(1) extra space.
- **Fixed-size window:** for a window of size k, don't re-sum all k items for each position. Add the item entering and subtract the item leaving. That's O(1) per step.
- **Variable-size window:** grow the right edge. When the window breaks a rule, shrink from the left until it's valid again. Each item enters once and leaves once, so it's O(n) overall.

A picture instead of code: a 7-day step count. When day 8 arrives, the new window is days 2–8. Its total is the old total, plus day 8, minus day 1. Six of the seven numbers didn't change, so don't add them up again.

---

## The katas

### twoSumSorted — opposite ends

**Building blocks:** `left`, `right`, `while (left < right)`. No `Map` or `Set` here: O(1) extra space is the point.

### removeDuplicatesSorted — fast/slow in place

**The concept:** `slow` is the length of the deduplicated prefix so far. When `fast` finds a value different from the last kept one, write it at `slow` and advance `slow`.

### maxSumSubarray — fixed window

**Building blocks:** sum the first k, then slide. Watch out for an all-negative input, so don't start the max at 0.

### longestUniqueSubstring — variable window

**The concept:** grow `right`. If the new character is already in the window, move `left` past its previous occurrence. A `Map` of character → last index lets you jump `left` straight there, but never move `left` backwards.

### isSubsequence — two strings, two pointers

**The concept:** one pointer in each string. Move through the long string, and advance the short string's pointer only on a match.
