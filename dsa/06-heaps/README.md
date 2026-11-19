# DSA 06 · Heaps & Priority Queues

```sh
pnpm vitest dsa/06-heaps
```

A **priority queue** always hands you the smallest (or largest) item next, whatever order things went in. You use it for schedulers, "top K" problems, merging sorted streams, and Dijkstra's shortest path (module 07). A **binary heap** is the standard way to build one. JS has no built-in heap, so you'll write one and reuse it.

## Key ideas

- **Shape:** a complete binary tree (every level full except maybe the last, which fills from the left), stored **in a plain array**. No node objects.
- **Index maths:** for the item at `i`, its parent is at `Math.floor((i - 1) / 2)`, its left child at `2i + 1` and its right child at `2i + 2`.
- **Heap property (min-heap):** every parent ≤ its children. So the min is always at index 0. Siblings are *not* sorted relative to each other.
- **push:** add at the end, then **sift up**: swap with the parent while it's smaller than its parent. O(log n).
- **pop:** take index 0, move the *last* item to index 0, then **sift down**: swap with the smaller child while it's bigger than either child. O(log n).
- **Comparator:** take `(a, b) => number` like `sort` does, so the same class works as a min-heap, a max-heap, or a heap of objects ordered by any field.
- **Top-K trick:** to find the K *largest* items, keep a *min*-heap of size K. Whenever it grows past K, pop the smallest. What's left are the K largest. That's O(n log k).

---

## The katas

### MinHeap

**Building blocks:** `#items = []`, `#compare`, private `#siftUp(i)` / `#siftDown(i)`, destructuring swap `[a[i], a[j]] = [a[j], a[i]]`. Watch the edge case of popping the last remaining item.

### kthLargest

**Building blocks:** your `MinHeap`, the size-K trick above.

### topKFrequent

**The concept:** count with a `Map`, then use a heap ordered by count to keep the K most frequent.

### mergeKSorted

**The concept:** put the *first* item of each list in a heap, along with which list it came from and its index. Pop the smallest, then push the next item from that same list. Repeat until the heap is empty.

**Building blocks:** heap entries like `{ value, list, index }` with a comparator on `value`.
