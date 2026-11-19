/**
 * Helpers for this module. Already implemented; read, don't edit.
 *   TreeNode              — { value, left, right }
 *   fromLevelOrder(arr)   — [4, 2, 7, null, 3] → tree (null = missing node)
 *   toLevelOrder(root)    — tree → array in the same format, trailing nulls trimmed
 */
export class TreeNode {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

export function fromLevelOrder(arr) {
  if (!arr.length || arr[0] == null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let head = 0;
  let i = 1;
  while (i < arr.length) {
    const node = queue[head++];
    if (arr[i] != null) queue.push((node.left = new TreeNode(arr[i])));
    i++;
    if (i < arr.length && arr[i] != null) queue.push((node.right = new TreeNode(arr[i])));
    i++;
  }
  return root;
}

export function toLevelOrder(root) {
  const out = [];
  const queue = [root];
  let head = 0;
  while (head < queue.length) {
    const node = queue[head++];
    if (node) {
      out.push(node.value);
      queue.push(node.left, node.right);
    } else out.push(null);
  }
  while (out.length && out.at(-1) === null) out.pop();
  return out;
}
