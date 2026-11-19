# DSA 03 · Linked Lists

```sh
pnpm vitest dsa/03-linked-lists
```

A **linked list** is a chain of nodes. Each node holds a value and a reference to the next node. There's no index. To reach item 5 you walk from the head. In exchange, inserting or removing at a known spot is O(1): you just re-point a reference, with no shifting of everything after it.

You'll rarely use one directly in JS, but they're the clearest way to learn **pointer manipulation**: rewiring references without losing track of anything. The same skill is used in trees and graphs, and it's an interview staple.

`listHelpers.js` is already written for you. It has a `ListNode` class plus `fromArray`/`toArray` so tests can build lists quickly. Read it first.

## Key ideas

- **The head** is your only way in. Lose the reference to it and the list is gone.
- **Walking:** `let node = head; while (node) { ...; node = node.next; }`.
- **Rewiring order matters.** Before you change `node.next`, save anything you'll still need from it.
- **Draw it.** Boxes and arrows on paper, updated one line of code at a time. This is the single best debugging technique for this module.
- **Fast and slow pointers:** one pointer moves 1 step, the other moves 2. When fast reaches the end, slow is in the middle. If there's a cycle, fast eventually laps slow and they meet (Floyd's algorithm).

---

## The katas

### LinkedList — a class wrapping nodes

**The concept:** keep `head`, `tail` and `size` so `append` is O(1). Every method has to handle the empty list and the one-item list. Those are where the bugs live.

**Building blocks:** `ListNode` from `listHelpers.js`, `#head`, `#tail`, `#size`, `*[Symbol.iterator]()` (a generator method, module 13).

### reverseList — rewiring in place

**The concept:** walk the list, turning each `next` arrow around to point backwards. You need three references: the previous node, the current node and the next one (saved *before* you overwrite `current.next`).

```js
// A different problem: swapping two variables needs a temporary for the same reason
let tmp = a; a = b; b = tmp;
```

### hasCycle — Floyd's tortoise and hare

**Building blocks:** `slow` and `fast` pointers, `while (fast && fast.next)`, comparing nodes with `===`. An O(n)-space version with a `Set` of visited nodes also works. Write both.

### middleNode

**Building blocks:** fast/slow again. Work out which middle you land on for even lengths.

### mergeSorted — building a new chain

**The concept:** a **dummy head** node saves you from special-casing "is this the first node?". Attach nodes to `tail.next`, move `tail` along, and return `dummy.next` at the end.

**Building blocks:** `new ListNode(0)` as the dummy, a `while (a && b)` loop, then attach whichever list is left over.
