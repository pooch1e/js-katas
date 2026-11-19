# DSA 11 · Recursion & Backtracking

```sh
pnpm vitest dsa/11-backtracking
```

**Backtracking** builds solutions one choice at a time. When a partial solution can't possibly work, it gives up on that branch and **undoes** the last choice to try the next one. It's how you generate every permutation or subset, solve puzzles like N-Queens and Sudoku, and search any space of combinations.

## Key ideas

The template is always the same three steps:

```js
function backtrack(partial) {
  if (isComplete(partial)) { results.push([...partial]); return; }   // copy!
  for (const choice of choicesFor(partial)) {
    if (!isValid(partial, choice)) continue;   // pruning
    partial.push(choice);                       // 1. choose
    backtrack(partial);                         // 2. explore
    partial.pop();                              // 3. un-choose
  }
}
```

- **Copy when you save a result.** `partial` keeps changing after you push it. `results.push(partial)` gives you N references to the *same* array, which is empty by the end.
- **Pruning:** the earlier you reject an invalid partial solution, the less of the tree you explore. This is the difference between instant and never.
- **Avoiding duplicate combinations:** pass a `start` index so each recursive call only considers choices at or after it. Then `[1,2]` and `[2,1]` aren't both generated.
- **The count explodes:** n items have n! permutations and 2ⁿ subsets. Tests use small inputs on purpose.

---

## The katas

### permutations

**The concept:** at each step, choose any item not already used. A `used` boolean array (or a `Set` of indexes) tracks that.

### subsets

**The concept:** for each item, two choices: in or out. Or, using the `start` index pattern, *every* partial is itself a valid subset, so record it at every call, not just at the leaves.

### combinationSum

**The concept:** choose numbers (reuse allowed) that add up to the target. Pass `start` to avoid reordered duplicates, and pass the *remaining* target down. Prune when the remainder goes negative. Sorting the candidates first lets you `break` instead of `continue`.

### generateParentheses

**The concept:** build the string one character at a time. You may add `(` while you have opens left, and `)` only while it wouldn't close more than you've opened. Those two rules *are* the pruning, so you never generate an invalid string.

### nQueens

**The concept:** place one queen per row. For each column in the current row, check it isn't attacked. A queen attacks along its column and both diagonals. All cells on one diagonal share `row - col`, and all on the other share `row + col`, so three `Set`s make the check O(1).
