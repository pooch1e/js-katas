# 04 · Strings

**Builds on:** 02, 03.

```sh
pnpm vitest language/04-strings
```

Strings behave a lot like arrays of characters (they have `.length` and `str[i]`), but they are **immutable**. Every string method returns a *new* string. `str.toUpperCase()` on its own does nothing to `str`.

## Key ideas

- **Indexing:** `str[0]`, `str.at(-1)` (last char), `str.length`.
- **Immutable:** `str[0] = "X"` silently does nothing. Build a new string instead.
- **Building up a string:** either `result += char` in a loop, or collect pieces in an array and `.join("")` at the end.
- **String ↔ array:** `str.split("")` or `[...str]` gives an array of characters. `arr.join("")` goes back. `[...str]` is safer with emoji.
- **Case:** `toLowerCase()` / `toUpperCase()`. Normalise case *before* comparing.
- **Character codes:** `"a".charCodeAt(0)` is `97`, and `String.fromCharCode(98)` is `"b"`. Letters are consecutive numbers, so you can do arithmetic on them.
- **Testing characters:** `/[a-z]/i.test(ch)` checks for a letter. A small regex is fine here. You don't need to master regex yet.

---

## The katas

### reverseString

**The concept:** walk the string backwards, or convert to an array, reverse it, and join. Do both ways.

```js
// A different problem: every other character
function everyOther(str) {
  let out = "";
  for (let i = 0; i < str.length; i += 2) out += str[i];
  return out;
}
```

**Building blocks:** a `for` loop counting down, or `[...str]`, `.reverse()`, `.join("")`.

### isPalindrome — normalise, then compare

**The concept:** "A man, a plan, a canal: Panama" is a palindrome once you strip everything that isn't a letter or digit and lower-case it. Clean the input first, then the real check is easy.

**Building blocks:** `toLowerCase`, `replace(/[^a-z0-9]/g, "")` (`g` means *all* matches), and either your `reverseString` or two indexes walking inwards.

### titleCase — split, transform, join

**The concept:** a very common string pattern: split into pieces, change each piece, and join them back together.

```js
// A different problem: kebab-case to snake_case
const toSnake = (s) => s.split("-").join("_");
```

**Building blocks:** `split(" ")`, `str[0].toUpperCase()`, `str.slice(1)`, `join(" ")`.

### countVowels

**The concept:** check each character against a set of allowed characters.

**Building blocks:** `for...of` over a string, `"aeiou".includes(ch)`, `toLowerCase`.

### caesarCipher — arithmetic on characters

**The concept:** turn a letter into a number, shift it, and wrap around the alphabet with `%`, then turn it back into a letter.

```js
// A different problem: the wrap-around trick for hours on a clock
const hourAfter = (hour, add) => (hour + add) % 12;
```

**Building blocks:** `charCodeAt`, `String.fromCharCode`, `%`. Watch out: in JS, `-1 % 26` is `-1`, not `25`. Upper and lower case have different starting codes (`"A"` is 65, `"a"` is 97).

### compressRuns — tracking the previous character

**The concept:** "run-length encoding". Walk the string, keeping track of the current character and how many times in a row you've seen it. When the character changes, write out the run and start a new one. Don't forget the last run after the loop ends.

**Building blocks:** a loop, two variables (`current`, `count`), string concatenation.
