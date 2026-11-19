# 02 · Control Flow & Loops

**Builds on:** 01.

```sh
pnpm vitest language/02-control-flow
```

Programs make decisions (`if`, `switch`) and repeat work (`for`, `while`). Most "I don't know where to start" moments come down to two questions: what changes on each step, and when do I stop?

## Key ideas

- **`if / else if / else`** checks top to bottom and runs the first branch that matches. Order matters.
- **Early return.** Handle the weird cases first and `return`. The rest of the function can then assume good input, with no nesting.
- **`switch`** compares with `===`. Without `break` (or `return`), execution *falls through* into the next case, which is sometimes exactly what you want.
- **`for (let i = 0; i < n; i++)`** when you know how many steps. **`while (cond)`** when you only know when to stop. **`for...of`** to visit each item of an array.
- **Off-by-one errors.** `<` vs `<=` is the most common bug in this module. When a test fails, check your boundaries first.
- **`%` (remainder).** `a % b === 0` means "a is divisible by b".

---

## The katas

### fizzBuzz — order of conditions

**The concept:** when two conditions can both be true, check the *more specific* one first, or it never gets a chance to run.

```js
// A different problem: shipping. The free-shipping check must come before the "heavy" check.
function shippingLabel(total, weightKg) {
  if (total >= 100) return "free";
  if (weightKg > 20) return "freight";
  return "standard";
}
```

**Building blocks:** a `for` loop from 1 to n, `%`, `push`, `String(n)`.

### letterGrade — ranges and guard clauses

**The concept:** reject bad input first with a guard clause, then check ranges from high to low, so each check only needs one comparison.

```js
// A different problem: a guard clause that throws
function setVolume(level) {
  if (typeof level !== "number") throw new TypeError("level must be a number");
  // ...the happy path, free to assume a number
}
```

**Building blocks:** `throw new RangeError(message)`, `if` chains, `>=`.

### daysInMonth — `switch` and fall-through

**The concept:** several cases sharing one result is the classic place to let `switch` cases fall through.

```js
// A different problem: weekend or weekday
switch (day) {
  case "sat":
  case "sun":
    return "weekend";
  default:
    return "weekday";
}
```

**Building blocks:** `switch`, `case`, `default`, `return`. Look up the leap year rule: divisible by 4, except centuries, unless divisible by 400.

### collatzSteps — `while` when you don't know the count

**The concept:** a `while` loop runs until its condition is false. You need a value that changes each time round, or it never ends.

```js
// A different problem: how many times can you halve n before it drops below 1?
let halvings = 0;
while (n >= 1) { n = n / 2; halvings++; }
```

**Building blocks:** `while`, a counter, `%` to test for even/odd.

### isPrime — loops that can stop early

**The concept:** you can `return` from inside a loop the moment you know the answer. You also don't need to check every number. If `n` has a divisor, one of them is at most `√n`.

**Building blocks:** `for`, `%`, `return` inside the loop, `Math.sqrt` (or `i * i <= n`).

### sumMultiples — accumulating

**The concept:** start a running total at 0, add to it inside the loop, and return it after the loop.

**Building blocks:** `let total = 0`, `for`, `||` to combine two conditions.
