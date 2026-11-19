/**
 * new LRUCache(capacity)
 *   get(key)        — value or undefined; counts as a "use"
 *   set(key, value) — adds/updates; counts as a "use"; evicts the least
 *                     recently used key when over capacity
 *   size            — number of entries (a getter, not a method)
 */
import { describe, it, expect } from "vitest";
import { LRUCache } from "./LRUCache.js";

describe("LRUCache", () => {
  it("stores and retrieves values", () => {
    const c = new LRUCache(2);
    c.set("a", 1);
    expect(c.get("a")).toBe(1);
  });

  it("returns undefined for missing keys", () => {
    expect(new LRUCache(2).get("x")).toBeUndefined();
  });

  it("evicts the oldest key when over capacity", () => {
    const c = new LRUCache(2);
    c.set("a", 1);
    c.set("b", 2);
    c.set("c", 3);
    expect(c.get("a")).toBeUndefined();
    expect(c.get("b")).toBe(2);
    expect(c.size).toBe(2);
  });

  it("treats get as a use, protecting that key from eviction", () => {
    const c = new LRUCache(2);
    c.set("a", 1);
    c.set("b", 2);
    c.get("a");
    c.set("c", 3);
    expect(c.get("a")).toBe(1);
    expect(c.get("b")).toBeUndefined();
  });

  // Updating an existing key must not grow the cache or evict anything.
  it("updates an existing key without evicting", () => {
    const c = new LRUCache(2);
    c.set("a", 1);
    c.set("b", 2);
    c.set("a", 10);
    expect(c.size).toBe(2);
    expect(c.get("a")).toBe(10);
    expect(c.get("b")).toBe(2);
  });

  it.todo("works with non-string keys like numbers and objects");

  // Set a, set b, set a again, then set c. Which key should be gone?
  it.todo("treats set as a use too (re-setting 'a' protects it from eviction)");
});
