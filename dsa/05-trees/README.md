# DSA 05 · Trees

```sh
pnpm vitest dsa/05-trees
```

A **binary tree** is a set of nodes where each node has at most two children, `left` and `right`. Trees are recursive by nature: each child is the root of a smaller tree. That's why tree code is usually short and recursive, and why language module 09 matters here.

`treeHelpers.js` is already written. It has `TreeNode` plus `fromLevelOrder`/`toLevelOrder` to build trees from arrays like `[4, 2, 7, 1, 3, null, 9]` (read row by row, left to right, `null` = no node).

## Key ideas

- **The recursive template:** handle `null` (the base case), recurse into `left` and `right`, then combine the results with the current node.

  ```js
  // A different problem: count the nodes in a tree
  function count(node) {
    if (!node) return 0;
    return 1 + count(node.left) + count(node.right);
  }
  ```
- **Depth-first (DFS) orders:** *pre-order* (node, left, right), *in-order* (left, node, right), *post-order* (left, right, node). DFS is recursion or an explicit stack.
- **Breadth-first (BFS):** visit level by level using a **queue** (DSA 02). Use it for "by level" questions.
- **Binary Search Tree (BST):** for every node, *everything* in its left subtree is smaller and *everything* in its right subtree is larger. That makes lookup O(height): O(log n) when balanced, O(n) when it degenerates into a line (try inserting already-sorted data).
- **In-order traversal of a BST yields sorted values.** This is very handy.

---

## The katas

### BinarySearchTree

**The concept:** `insert`, `has`, `min` and `max` each walk down one path, going left or right by comparing. `delete` is the hard one. A node with two children is replaced by its **in-order successor** (the smallest value in its right subtree), and then the successor is deleted from there.

**Building blocks:** `TreeNode`, a private `#root`, recursive helper methods that take a node and return the (possibly new) subtree root. That "return the new subtree" style makes `delete` far easier.

### maxDepth

**Building blocks:** the recursive template, `Math.max`.

### levelOrder — BFS

**The concept:** a queue of nodes. Process one *level* at a time by noting the queue's length before you start the level and dequeuing exactly that many.

**Building blocks:** an array used as a queue (an index pointer avoids `shift`), a `while` loop, an inner `for` loop.

### isValidBst — passing constraints down

**The concept:** comparing a node only with its direct children isn't enough. A node deep in the left subtree must be smaller than *every* ancestor it sits left of. Pass down the allowed `(min, max)` range as you recurse.

**Building blocks:** a helper `check(node, min, max)`, `-Infinity`/`Infinity` as the starting bounds.

### invertTree — mirror image

**Building blocks:** the recursive template, swapping `left` and `right`.
