# DSA 12 · Dynamic Programming

```sh
pnpm vitest dsa/12-dynamic-programming
```

**Dynamic programming (DP)** is recursion plus remembering. If a problem breaks into smaller sub-problems, and the *same* sub-problems come up again and again, solve each one once and store the answer. Naive recursive Fibonacci makes ~2ⁿ calls. With memoisation it makes n.

## Key ideas

The four questions for every DP problem:

1. **State:** what's the smallest set of numbers that describes a sub-problem? (`i` = "the first i items", `amount` = "the amount left", and so on.)
2. **Recurrence:** how is the answer for a state built from smaller states?
3. **Base cases:** which states can you answer directly?
4. **Order:** in which order do you fill states so that the smaller ones are ready when you need them?

Two ways to implement it:

- **Top-down (memoisation):** write the natural recursion, and cache results in a `Map` keyed by the state. This is your `memoize` from language module 08, applied to a recursive function.
- **Bottom-up (tabulation):** an array `dp` where `dp[i]` is the answer for state `i`. Fill it with a loop from the base cases upwards. No recursion, so no stack limits.

```js
// A different problem: paths through a grid moving only right or down (top-down, memoised)
function gridPaths(rows, cols, memo = new Map()) {
  if (rows === 1 || cols === 1) return 1;              // base case: a single row or column
  const key = `${rows},${cols}`;                        // the state
  if (!memo.has(key)) {
    memo.set(key, gridPaths(rows - 1, cols, memo) + gridPaths(rows, cols - 1, memo));  // recurrence
  }
  return memo.get(key);
}
```

**Solve each kata twice:** top-down first (it's closer to how you think), then bottom-up.

---

## The katas

### climbStairs

**State:** the step you're on. **Question:** how many ways can you reach step `n` if each move is 1 or 2 steps? Think about the *last* move.

### coinChange

**State:** the amount remaining. **Recurrence:** try each coin as the last coin used, and take the best. Use `Infinity` for "impossible" so `Math.min` just works, and convert it to `-1` at the end.

### longestCommonSubsequence

**State:** two indexes, one in each string, so the table is 2D. If the current characters match, extend the answer from both shorter prefixes. If not, take the better of dropping one character from either string.

**Building blocks:** `Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))`.

### knapsack

**State:** (item index, capacity left). For each item: skip it, or take it if it fits. Take the max. This is the classic "take or skip" pattern.

### maxSubarray — Kadane's algorithm

**State:** the best sum of a subarray *ending at* index i. Either extend the previous best or start fresh at i. Keep a running overall max. It's O(n) time and O(1) space, so the "table" shrinks to a single variable.
