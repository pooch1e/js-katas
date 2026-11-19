/**
 * new HashTable(initialCapacity = 8) — string keys.
 *   set(k, v) returns the table; get(k) → value | undefined; has(k);
 *   delete(k) → true if it existed; size; capacity (bucket count);
 *   keys() → array of keys (any order).
 * Doubles capacity when size / capacity would exceed 0.75.
 */
import { describe, it, expect } from "vitest";
import { HashTable } from "./HashTable.js";

describe("HashTable", () => {
  it("stores and retrieves values", () => {
    const t = new HashTable();
    t.set("a", 1).set("b", 2);
    expect(t.get("a")).toBe(1);
    expect(t.get("b")).toBe(2);
  });

  it("returns undefined for missing keys", () => {
    expect(new HashTable().get("nope")).toBeUndefined();
  });

  it("overwrites an existing key without growing", () => {
    const t = new HashTable();
    t.set("a", 1);
    t.set("a", 2);
    expect(t.get("a")).toBe(2);
    expect(t.size).toBe(1);
  });

  it("deletes keys", () => {
    const t = new HashTable();
    t.set("a", 1);
    expect(t.delete("a")).toBe(true);
    expect(t.has("a")).toBe(false);
    expect(t.size).toBe(0);
    expect(t.delete("a")).toBe(false);
  });

  // With capacity 2, at least two of these must collide.
  it("handles collisions", () => {
    const t = new HashTable(2);
    ["x", "y", "z"].forEach((k, i) => t.set(k, i));
    expect([t.get("x"), t.get("y"), t.get("z")]).toEqual([0, 1, 2]);
  });

  it("doubles capacity when the load factor passes 0.75", () => {
    const t = new HashTable(4);
    t.set("a", 1).set("b", 2).set("c", 3);
    expect(t.capacity).toBe(4);
    t.set("d", 4);
    expect(t.capacity).toBe(8);
  });

  it.todo("keeps every value retrievable after several resizes (insert 1,000 keys)");

  it.todo("lists keys()");

  it.todo("stays fast: 100,000 inserts and lookups finish within the timeout");
});
