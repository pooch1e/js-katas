# DSA Track

**Do the language track first**, at least through module 13. This track assumes you're comfortable with classes at the LRU-cache level (module 11), recursion (09), closures (08) and Map/Set (11).

The first seven modules build **data structures**. The last five use them in **algorithms**. In this track, roughly 40% of the tests are `it.todo`, so writing the test is now half the kata.

## Big-O in one page

Big-O describes how the work grows as the input grows. You ignore constants and keep the biggest term.

| Big-O | Name | Example | n = 1,000,000 |
|---|---|---|---|
| O(1) | constant | `arr[i]`, `map.get(k)`, `set.has(x)` | 1 step |
| O(log n) | logarithmic | binary search | ~20 steps |
| O(n) | linear | one loop over the input | 1M steps |
| O(n log n) | linearithmic | merge sort, `arr.sort` | ~20M steps |
| O(n²) | quadratic | a loop inside a loop | 1,000,000M steps. Your test times out |
| O(2ⁿ) | exponential | naive recursive Fibonacci | never finishes |

How to find it:
- **Count the loops.** One loop over n is O(n). A loop inside a loop is O(n²). Halving each time is O(log n).
- **Hidden loops count.** `arr.includes`, `indexOf`, `shift`, `unshift`, `splice`, `slice` and spread are all O(n). `includes` inside a loop is O(n²).
- **Space counts too.** A `Set` of everything you've seen is O(n) extra memory. That's often a good trade for turning O(n²) time into O(n).

Some tests here use large inputs on purpose. `vitest.config.js` sets a 2-second timeout, so a correct but O(n²) solution fails.

## Modules

| # | Module | You'll build | Key idea |
|---|---|---|---|
| 01 | [Stacks](01-stacks/README.md) | Stack, isBalanced, evaluateRpn, MinStack, dailyTemperatures | LIFO; the monotonic stack |
| 02 | [Queues](02-queues/README.md) | Queue, hotPotato, CircularBuffer, RecentCounter | FIFO; why `shift()` is slow |
| 03 | [Linked Lists](03-linked-lists/README.md) | LinkedList, reverseList, hasCycle, middleNode, mergeSorted | pointers; fast/slow runners |
| 04 | [Hash Tables](04-hash-tables/README.md) | HashTable, twoSum, firstUniqueChar, longestConsecutive | hashing, buckets, resizing |
| 05 | [Trees](05-trees/README.md) | BinarySearchTree, maxDepth, levelOrder, isValidBst, invertTree | recursion on trees; BFS vs DFS |
| 06 | [Heaps](06-heaps/README.md) | MinHeap, kthLargest, topKFrequent, mergeKSorted | priority queues; sift up/down |
| 07 | [Graphs](07-graphs/README.md) | hasPath, shortestPathGrid, numIslands, topologicalSort, dijkstra | DFS, BFS, visited sets |
| 08 | [Sorting](08-sorting/README.md) | bubble, insertion, merge, quick sort | O(n²) vs O(n log n); stability |
| 09 | [Binary Search](09-binary-search/README.md) | binarySearch, searchInsert, firstBadVersion, searchRotated, sqrtFloor | halving; boundaries |
| 10 | [Two Pointers & Sliding Window](10-two-pointers/README.md) | twoSumSorted, removeDuplicatesSorted, maxSumSubarray, longestUniqueSubstring, isSubsequence | O(n²) → O(n) |
| 11 | [Backtracking](11-backtracking/README.md) | permutations, subsets, combinationSum, nQueens | choose / explore / un-choose |
| 12 | [Dynamic Programming](12-dynamic-programming/README.md) | climbStairs, coinChange, LCS, knapsack, maxSubarray | memoisation → tabulation |
