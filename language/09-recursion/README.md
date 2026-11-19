# 09 · Recursion

**Builds on:** 05–07.

```sh
pnpm vitest language/09-recursion
```

A recursive function calls itself on a *smaller* version of the problem. It sounds circular, but it's the natural fit for nested data like arrays inside arrays or objects inside objects, where you don't know how deep it goes. The dsa track leans on this heavily, so learn it here on friendly problems.

## Key ideas

Every recursive function needs two parts:

1. **Base case:** the input is small enough to answer directly. No recursive call.
2. **Recursive case:** shrink the problem, call yourself on the smaller piece, and combine the result.

```js
// A different problem: count the characters in a string, recursively
function len(str) {
  if (str === "") return 0;          // base case
  return 1 + len(str.slice(1));      // smaller problem + combine
}
```

- **Trust the recursion.** When writing the recursive case, *assume* the call on the smaller input already works. Don't try to trace every level in your head.
- **No base case (or never reaching it)** means `RangeError: Maximum call stack size exceeded`.
- **For nested data**, the question at each item is: "Is this a box I need to open (recurse into), or a plain value (base case)?"

---

## The katas

### factorial — the textbook one

`5! = 5 × 4!`. What's the smallest input you can answer without recursing?

**Building blocks:** a base case, `n * factorial(n - 1)`, a `RangeError` guard for negatives.

### sumNested — recursing into arrays

**The concept:** loop over the items. A number gets added, and an array gets *summed by calling yourself* and then added.

**Building blocks:** `Array.isArray`, a `for...of` loop *and* recursion together.

### flattenDeep — building results recursively

**The concept:** the same shape as `sumNested`, but instead of adding numbers you collect items. The recursive call returns an array, so you spread it into your result.

**Building blocks:** `push(...flattenDeep(item))`. (Don't use `arr.flat(Infinity)`. That's the answer, not the exercise.)

### deepClone — a copy that shares nothing

**The concept:** module 06 showed `{ ...obj }` only copies one level. A deep clone recurses into every array and object, so that no nested object is shared. Primitives are the base case, since they can't be shared.

```js
// A different problem: recursively upper-casing every string in a nested structure
function shout(value) {
  if (typeof value === "string") return value.toUpperCase();
  if (Array.isArray(value)) return value.map(shout);
  return value;
}
```

**Building blocks:** `Array.isArray`, `typeof x === "object" && x !== null`, `Object.entries` / `Object.fromEntries`. (Don't use `structuredClone`.)

### deepEqual — comparing by structure

**The concept:** two values are deep-equal if they're the same primitive, or both are arrays/objects with the same keys whose values are *deep-equal* (the recursive part).

**Building blocks:** `===`, `Object.keys(...).length`, `every`, `Array.isArray` (an array and an object with keys `"0"`, `"1"` are not equal).
