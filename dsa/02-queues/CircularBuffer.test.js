/**
 * new CircularBuffer(capacity, { overwrite = false })
 *   write(v) — adds v. When full: throws BufferFullError, or, with
 *              overwrite: true, replaces the oldest value.
 *   read()   — removes and returns the oldest value (undefined when empty)
 *   size     — values currently stored
 *   isFull()
 */
import { describe, it, expect } from "vitest";
import { CircularBuffer, BufferFullError } from "./CircularBuffer.js";

describe("CircularBuffer", () => {
  it("reads values in the order they were written", () => {
    const b = new CircularBuffer(3);
    b.write(1);
    b.write(2);
    expect(b.read()).toBe(1);
    expect(b.read()).toBe(2);
  });

  it("returns undefined when reading an empty buffer", () => {
    expect(new CircularBuffer(2).read()).toBeUndefined();
  });

  it("knows when it is full", () => {
    const b = new CircularBuffer(2);
    b.write(1);
    b.write(2);
    expect(b.isFull()).toBe(true);
    expect(b.size).toBe(2);
  });

  it("throws BufferFullError when writing to a full buffer", () => {
    const b = new CircularBuffer(1);
    b.write(1);
    expect(() => b.write(2)).toThrow(BufferFullError);
  });

  // Fill, read one, write one: the write index has to wrap to 0.
  it("wraps around after reads free up space", () => {
    const b = new CircularBuffer(2);
    b.write(1);
    b.write(2);
    b.read();
    b.write(3);
    expect([b.read(), b.read()]).toEqual([2, 3]);
  });

  it("overwrites the oldest value when overwrite is on", () => {
    const b = new CircularBuffer(2, { overwrite: true });
    b.write(1);
    b.write(2);
    b.write(3);
    expect([b.read(), b.read()]).toEqual([2, 3]);
  });

  it.todo("keeps size at capacity when overwriting");

  it.todo("survives many cycles of writes and reads");
});
