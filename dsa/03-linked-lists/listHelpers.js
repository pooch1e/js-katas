/**
 * Helpers for this module's tests and katas. Already implemented; read, don't edit.
 *   ListNode        — { value, next }
 *   fromArray(arr)  — builds a chain and returns its head (null for [])
 *   toArray(head)   — walks a chain into an array (stops after 10,000 nodes,
 *                     so a cycle you accidentally created can't hang the test)
 */
export class ListNode {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

export function fromArray(arr) {
  let head = null;
  for (let i = arr.length - 1; i >= 0; i--) head = new ListNode(arr[i], head);
  return head;
}

export function toArray(head) {
  const out = [];
  for (let node = head; node && out.length < 10_000; node = node.next) out.push(node.value);
  return out;
}
