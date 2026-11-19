# DSA 02 · Queues

```sh
pnpm vitest dsa/02-queues
```

A **queue** is first in, first out (FIFO), like a line at a till. Queues show up in task schedulers, breadth-first search (module 07), print spoolers, message brokers and rate limiters.

## Key ideas

- **Operations:** `enqueue` (add at the back), `dequeue` (remove from the front), `peek` (look at the front). All should be O(1).
- **Why not `arr.shift()`?** Removing from the front means moving every other item down one slot, which is O(n) in the worst case. Do it n times and you have O(n²).
- **The head-pointer trick:** don't remove from the front at all. Keep an index `head` pointing at the current front, and move it forward on dequeue. The items behind it are garbage you can tidy up occasionally. (A linked list from module 03 also works.)
- **Circular buffer:** a fixed-size array where the write position wraps around to 0 with `%`. No memory is allocated after creation. This is how audio buffers and logs with a fixed size work.

---

## The katas

### Queue — O(1) dequeue

**The concept:** store items in an object or array, plus two indexes: `head` (next to dequeue) and `tail` (next free slot). Size is `tail - head`.

```js
// A different problem: reading through a list with a cursor instead of removing items
let cursor = 0;
const next = () => list[cursor++];
```

**Building blocks:** `#items = {}` or `[]`, `#head = 0`, `#tail = 0`, `delete` (or set to `undefined`) on dequeue so memory can be freed.

### hotPotato — simulating with a queue

**The concept:** players stand in a circle and pass a potato. "Pass" means dequeue from the front and enqueue at the back. After `passes` passes, whoever holds it is out. Repeat until one is left.

**Building blocks:** your `Queue`, a `while (size > 1)` loop, an inner `for` loop for passing.

### CircularBuffer — wrap-around with %

**The concept:** a fixed array, a read index and a write index. Both advance with `(i + 1) % capacity`. Track the count separately, because "read index equals write index" can mean either empty or full.

**Building blocks:** `new Array(capacity)`, `%`, a `count` field, an `overwrite` option for when it's full.

### RecentCounter — a sliding time window

**The concept:** for each new ping, drop every ping older than 3000 ms from the front, and the queue length is your answer. Pings arrive in increasing time order, so the old ones are always at the front.

**Building blocks:** your `Queue` with `peek`, or an array with a head index.
