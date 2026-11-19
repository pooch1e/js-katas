# JS Katas

Learn JavaScript test-first, in small steps that build on each other. You start with values and loops, work up through closures and async, then data structures and algorithms, then object-oriented design. Every kata is a red → green → refactor loop with [vitest](https://vitest.dev).

```
language/   ← 15 modules: JavaScript itself, from types to building your own Promise
dsa/        ← 12 modules: data structures, then algorithms
oop/        ←  8 modules: classes, prototypes, composition, patterns, a capstone
```

Each module folder holds everything for that topic, side by side:

```
language/05-arrays/
├── README.md          ← read first: the concepts, with examples on *different* problems
├── chunk.js           ← your code (every stub throws "TODO: implement …")
├── chunk.test.js      ← the tests for that kata
└── ...                ← one .js + one .test.js per kata
```

## Setup

With [mise](https://mise.jdx.dev):

```sh
mise install     # Node + pnpm from mise.toml
pnpm install     # vitest
```

New to vitest? Read [HOW-VITEST-WORKS.md](HOW-VITEST-WORKS.md) first: watch mode, focusing tests, fake timers and debugging.

## The loop

```sh
pnpm vitest language/01-values-types        # watch one module (re-runs on save)
pnpm vitest language/01-values-types/getType # watch one kata
pnpm vitest -t "returns 'null'"             # only tests whose name matches
pnpm test:run                               # everything once (lots of red; that's expected)
```

1. **Read** the module README. It explains each concept with a JS example on a *different* problem, plus the building blocks you'll need. It never gives the answer.
2. **Red.** Run the kata's tests and watch them fail. Read the failure messages properly, because they tell you what's expected.
3. **Green.** Make them pass, however clumsily.
4. **Refactor.** Tidy up while green. Many READMEs suggest a second approach (a loop vs built-ins, recursion vs iteration). Do it.

### Two kinds of test

- **Written tests.** Read them; they're the spec. Make them pass.
- **Todo tests** (`it.todo("…")`). These are tests *you* write. Replace `it.todo("name")` with `it("name", () => { ... })`, copying the shape of a written test in the same file, watch it go red, then make it pass. Many have a hint comment above pointing at the gotcha.

The share of todo tests grows as you go: about 20% in `language/`, about 40% in `dsa/` and `oop/`, and over half in the OOP capstone.

### Rules of the road

- **No peeking at solutions.** There are none in this repo, on purpose. If you're stuck, re-read the README section, write a smaller test, or `console.log` your way through it.
- **Don't edit a written test to make it pass.** If you think a test is wrong, check its header comment first, since that's the spec.
- **Stuck for 30+ minutes?** Skip that kata, do the next, and come back later. Later katas often make earlier ones click.

## Modules

### Language track: do these in order

| # | Module | You'll learn |
|---|---|---|
| 01 | [Values & Types](language/01-values-types/README.md) | `typeof` quirks, `===`, truthy/falsy, `NaN`, floating point |
| 02 | [Control Flow & Loops](language/02-control-flow/README.md) | `if`/`switch`, `for`/`while`, guard clauses, off-by-one |
| 03 | [Functions](language/03-functions/README.md) | defaults, rest params, options objects, pure functions |
| 04 | [Strings](language/04-strings/README.md) | immutability, split/transform/join, char codes |
| 05 | [Arrays](language/05-arrays/README.md) | loops first, then methods; mutating vs non-mutating |
| 06 | [Objects](language/06-objects/README.md) | lookup tables, **references vs copies**, immutable updates |
| 07 | [Higher-Order Functions](language/07-higher-order-functions/README.md) | your own map/filter/reduce, groupBy, sortBy, pipe |
| 08 | [Scope & Closures](language/08-scope-closures/README.md) | private state, once, memoize |
| 09 | [Recursion](language/09-recursion/README.md) | base cases, nested data, deepClone, deepEqual |
| 10 | [Errors](language/10-errors/README.md) | custom errors, `cause`, AggregateError, `finally` |
| 11 | [Map & Set](language/11-map-set/README.md) | seen-sets, O(1) lookups, an LRU cache |
| 12 | [`this` & Binding](language/12-this-binding/README.md) | call-site rules, your own call/bind, arrows in methods |
| 13 | [Iterators & Generators](language/13-iterators-generators/README.md) | the iterable protocol, lazy & infinite sequences |
| 14 | [Async I](language/14-async-basics/README.md) | the event loop, promises, promisify, timeouts |
| 15 | [Async II](language/15-async-advanced/README.md) | promiseAll, pool, retry, debounce/throttle, **your own Promise** |

### DSA track: after the language track (at least through 13)

See [dsa/README.md](dsa/README.md) for a one-page Big-O primer.

| # | Module | Key idea |
|---|---|---|
| 01 | [Stacks](dsa/01-stacks/README.md) | LIFO; the monotonic stack |
| 02 | [Queues](dsa/02-queues/README.md) | FIFO; O(1) dequeue; circular buffers |
| 03 | [Linked Lists](dsa/03-linked-lists/README.md) | pointer rewiring; fast/slow runners |
| 04 | [Hash Tables](dsa/04-hash-tables/README.md) | hashing, collisions, resizing |
| 05 | [Trees](dsa/05-trees/README.md) | recursion on trees; BST; BFS by level |
| 06 | [Heaps](dsa/06-heaps/README.md) | priority queues; top-K |
| 07 | [Graphs](dsa/07-graphs/README.md) | DFS, BFS, topological sort, Dijkstra |
| 08 | [Sorting](dsa/08-sorting/README.md) | O(n²) vs O(n log n); stability |
| 09 | [Binary Search](dsa/09-binary-search/README.md) | invariants and boundaries |
| 10 | [Two Pointers & Sliding Window](dsa/10-two-pointers/README.md) | O(n²) → O(n) |
| 11 | [Backtracking](dsa/11-backtracking/README.md) | choose / explore / un-choose |
| 12 | [Dynamic Programming](dsa/12-dynamic-programming/README.md) | memoisation → tabulation |

### OOP track: after the language track

See [oop/README.md](oop/README.md).

| # | Module | Key idea |
|---|---|---|
| 01 | [Classes](oop/01-classes/README.md) | constructors, getters/setters, static |
| 02 | [Encapsulation](oop/02-encapsulation/README.md) | `#private`, invariants, immutability |
| 03 | [Prototypes](oop/03-prototypes/README.md) | what `class` and `new` really do |
| 04 | [Inheritance](oop/04-inheritance/README.md) | `extends`, `super`, abstract bases |
| 05 | [Polymorphism](oop/05-polymorphism/README.md) | one interface, many implementations |
| 06 | [Composition](oop/06-composition/README.md) | mixins, composition over inheritance, dependency injection |
| 07 | [Design Patterns](oop/07-patterns/README.md) | observer, strategy, command, decorator, state |
| 08 | [Capstone: Library](oop/08-capstone/README.md) | everything together, spec-driven |

## Vitest cheat sheet

| You want | Write |
|---|---|
| exact equality (primitives, same object) | `expect(x).toBe(5)` |
| deep equality (arrays/objects by content) | `expect(arr).toEqual([1, 2])` |
| null / undefined | `toBeNull()`, `toBeUndefined()` |
| floats | `expect(0.1 + 0.2).toBeCloseTo(0.3)` |
| array contains | `toContain(x)`, `toContainEqual({ a: 1 })` |
| length | `toHaveLength(3)` |
| instance of a class | `toBeInstanceOf(Point)` |
| throws a specific error | `expect(() => fn()).toThrow(RangeError)` or `.toThrow(/message/)` |
| promise resolves / rejects | `await expect(p).resolves.toBe(1)`, `await expect(p).rejects.toThrow(X)` |
| a spy was called | `const fn = vi.fn(); ...; expect(fn).toHaveBeenCalledWith(1, 2)` |
| negate anything | `expect(x).not.toBe(y)` |

Always pass `toThrow` a **class or regex**. A bare `.toThrow()` would also pass on the stub's "TODO: implement" error, which tells you nothing.
