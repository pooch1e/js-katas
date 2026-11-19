# 01 · Values & Types

**Builds on:** nothing. Start here.

```sh
pnpm vitest language/01-values-types
```

Every value in JS has a type, and most bugs early on come from JS quietly converting one type into another. This module is about seeing those conversions coming.

## Key ideas

- **Primitives:** `string`, `number`, `boolean`, `undefined`, `null`, `bigint`, `symbol`. Everything else is an **object** (arrays and functions included).
- **`typeof` has famous lies.** `typeof null` is `"object"` (a 1995 bug kept for compatibility). `typeof []` is `"object"`. `typeof NaN` is `"number"`.
- **`===` vs `==`.** `===` compares without converting. `==` converts first, using rules nobody remembers (`"" == 0` is `true`). Use `===`.
- **Truthy and falsy.** In an `if`, every value becomes `true` or `false`. The falsy list is short: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy, including `"0"`, `"false"`, `[]` and `{}`.
- **`NaN` is not equal to itself.** `NaN === NaN` is `false`. You need `Number.isNaN(x)` to detect it.
- **Floating point.** `0.1 + 0.2` is `0.30000000000000004`. Numbers are binary fractions, so some decimals can't be stored exactly.

---

## The katas

### getType — a `typeof` that tells the truth

**The concept:** `typeof` gets most types right, so a better version only has to catch the cases it gets wrong. Handle the special cases first, then fall back to `typeof`.

```js
// A different problem: a label for a log line, with special cases first
function logLabel(level) {
  if (level === undefined) return "[INFO]";
  if (level >= 50) return "[ERROR]";
  return `[LEVEL ${level}]`;
}
```

**Building blocks:** `typeof x`, `x === null`, `Array.isArray(x)`, `Number.isNaN(x)`. Think about the order you check things in.

### toNumberOrNull — converting without surprises

**The concept:** `Number(x)`, `parseInt(x)` and unary `+x` all convert to numbers, and they disagree with each other. `Number("")` is `0`, `Number("12px")` is `NaN`, `parseInt("12px")` is `12`, and `Number(true)` is `1`. Decide what's allowed in, reject everything else, and never let a `NaN` escape.

```js
// A different problem: only accept real booleans or the strings "yes"/"no"
function toBoolOrNull(input) {
  if (typeof input === "boolean") return input;
  if (input === "yes") return true;
  if (input === "no") return false;
  return null;
}
```

**Building blocks:** `typeof`, `String.prototype.trim`, `Number(str)`, `Number.isFinite(n)`.

### isBlank — "nothing there" comes in several shapes

**The concept:** `null`, `undefined`, an empty string and a string of only spaces all mean "the user gave us nothing". But `0` and `false` are real answers, so a plain falsy check (`!value`) is wrong here.

**Building blocks:** `== null` is the one accepted use of `==`, because it matches both `null` and `undefined`. Also `typeof`, `trim`, `.length`.

### countTruthy — what `if` actually sees

**The concept:** `Boolean(x)` (or `!!x`) gives you the value an `if` would see. Learn the falsy list by heart and this kata is a loop.

**Building blocks:** a `for...of` loop, a counter, `Boolean(x)`.

### addMoney — floating point and rounding

**The concept:** you can't fix floating point, but you can round the answer to the precision you care about. For money that's 2 decimal places. A common approach is to scale up, round to an integer, then scale back down.

```js
// A different problem: round a percentage to 1 decimal place
const roundTo1dp = (n) => Math.round(n * 10) / 10;
```

**Building blocks:** `Math.round`, multiplication and division by a power of 10.

### sameValue — equality with no exceptions

**The concept:** `===` has two exceptions. It says `NaN !== NaN`, and it says `0 === -0`. Write an equality check that fixes both. (`Object.is` already does this. Don't use it. Build it yourself.)

**Building blocks:** `Number.isNaN`. To tell `0` from `-0`, try dividing by them: `1 / 0` is `Infinity`, `1 / -0` is `-Infinity`.
