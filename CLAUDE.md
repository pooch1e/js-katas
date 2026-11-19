# js-katas: notes for Claude

This is the user's personal JS learning repo (TDD with vitest). Tracks: `language/` → `dsa/` → `oop/`.

## Hard rule: no spoilers

- Never write, paste, or describe a working solution to a kata, in any language, in chat, docs or commits. That includes "just this one function".
- If asked for help: ask what they've tried, point at the relevant README section, suggest a smaller failing test, or explain the *concept* on a different problem.
- Don't answer the questions that test hint comments pose. They're for the learner.
- Before finalising any README text, ask: "could they paste this and pass the tests?" If yes, rewrite it.

## Conventions when adding or changing katas

- One `kata.js` + `kata.test.js` per kata. The stub throws `new Error("TODO: implement <name>")`.
- Test files start with a JSDoc header that is the spec. Written tests come first, then `it.todo(...)`. Hint comments sit above the test they hint at.
- Error assertions must name a class or regex (`toThrow(RangeError)`, `toThrow(/required/)`), never bare `toThrow()`, because the stub would pass it.
- No written test may pass against the stub. Verify with reference solutions kept **outside** the repo.
- README per module: the concept, a JS example on a *different* problem, and building blocks (APIs to look up), never assembled into the answer.
- No inline comments in stubs. JSDoc file headers only.
