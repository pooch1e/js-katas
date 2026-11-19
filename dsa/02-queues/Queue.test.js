/**
 * Queue — enqueue(v) returns the new size; dequeue()/peek() return undefined
 * when empty; size is a getter. Don't use Array.prototype.shift.
 */
import { describe, it, expect } from "vitest";
import { Queue } from "./Queue.js";

describe("Queue", () => {
  it("starts empty", () => {
    const q = new Queue();
    expect(q.size).toBe(0);
    expect(q.isEmpty()).toBe(true);
  });

  it("dequeues in the order items were enqueued", () => {
    const q = new Queue();
    q.enqueue("a");
    q.enqueue("b");
    q.enqueue("c");
    expect([q.dequeue(), q.dequeue(), q.dequeue()]).toEqual(["a", "b", "c"]);
  });

  it("peeks at the front without removing it", () => {
    const q = new Queue();
    q.enqueue(1);
    q.enqueue(2);
    expect(q.peek()).toBe(1);
    expect(q.size).toBe(2);
  });

  it("returns undefined from dequeue and peek when empty", () => {
    const q = new Queue();
    expect(q.dequeue()).toBeUndefined();
    expect(q.peek()).toBeUndefined();
  });

  it("works when enqueues and dequeues are interleaved", () => {
    const q = new Queue();
    q.enqueue(1);
    q.enqueue(2);
    q.dequeue();
    q.enqueue(3);
    expect(q.dequeue()).toBe(2);
    expect(q.dequeue()).toBe(3);
    expect(q.size).toBe(0);
  });

  it.todo("keeps size correct after dequeueing from an empty queue");

  // Use vi.spyOn(Array.prototype, "shift") and assert it was never called.
  it.todo("never calls Array.prototype.shift");
});
