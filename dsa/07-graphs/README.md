# DSA 07 · Graphs

```sh
pnpm vitest dsa/07-graphs
```

A **graph** is a set of nodes connected by edges. Trees are graphs with no cycles and one root. Graphs in general can have cycles, disconnected parts and edges in either or both directions. Maps, social networks, dependency trees and grids are all graphs.

## Key ideas

- **Adjacency list:** the usual representation in JS, `{ a: ["b", "c"], b: ["d"], ... }` (or a `Map`). Each node lists its neighbours.
- **Grids are graphs too.** Each cell's neighbours are up, down, left and right. A list of direction offsets `[[1,0],[-1,0],[0,1],[0,-1]]` saves writing four `if`s.
- **Visited set:** because graphs can have cycles, you *must* remember where you've been, or you'll loop forever. This is the big difference from trees.
- **DFS** (recursion or a stack) goes deep first. Good for "can I reach…?", counting connected regions, and cycle detection.
- **BFS** (a queue) goes level by level, so the first time it reaches a node is along a **shortest path** (when all edges cost the same).
- **Topological sort:** an order where every node comes after its dependencies. **Kahn's algorithm** counts each node's incoming edges, starts with the zero-count nodes, and as each is "done" it decrements its neighbours' counts. Leftover nodes at the end mean there's a cycle.
- **Dijkstra:** shortest paths when edges have *different* weights. Always expand the closest unvisited node next. A priority queue (your `MinHeap` from module 06) makes "closest next" fast.

---

## The katas

### hasPath — DFS with a visited set

The guard every graph walk needs, wherever you visit a node:

```js
if (seen.has(node)) return;   // been here already: stop, or a cycle loops forever
seen.add(node);
```

**Building blocks:** recursion (or a stack), a `Set` passed along or held in a closure, `graph[node] ?? []` for nodes with no entry.

### shortestPathGrid — BFS

**The concept:** queue up `[row, col, distance]`. Mark a cell visited *when you enqueue it*, not when you dequeue it, or the same cell gets queued many times.

**Building blocks:** a queue with a head index, a visited `Set` of `"r,c"` strings (or a 2D boolean array), bounds checks.

### numIslands — counting connected regions

**The concept:** scan every cell. When you find unvisited land, that's a new island: count it, then flood-fill (DFS or BFS) to mark the whole island visited.

### topologicalSort — Kahn's algorithm

**Building blocks:** a `Map` of in-degree counts, a queue of zero-in-degree nodes, a result array. Compare the result's length with the node count to detect a cycle.

### dijkstra

**Building blocks:** a `distances` object starting at `Infinity`, a `MinHeap` of `[distance, node]` (import it with `import { MinHeap } from "../06-heaps/MinHeap.js"`), and skipping stale heap entries whose distance is already beaten. A simple "scan for the smallest unvisited" loop also works, in O(V²). Start with that if the heap is giving you trouble.
