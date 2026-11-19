/**
 * lazyMap(iterable, fn) / lazyFilter(iterable, fn) — generators that
 * transform/filter one value at a time, only when asked.
 */
import { describe, it, expect, vi } from "vitest";
import { lazyMap, lazyFilter } from "./lazy.js";

function* naturals() {
  let n = 1;
  while (true) yield n++;
}

const first = (iter, n) => {
  const out = [];
  for (const v of iter) {
    if (out.length === n) break;
    out.push(v);
  }
  return out;
};

describe("lazyMap", () => {
  it("maps an array", () => {
    expect([...lazyMap([1, 2, 3], (n) => n * 10)]).toEqual([10, 20, 30]);
  });

  it("does no work until a value is requested", () => {
    const fn = vi.fn((n) => n);
    const mapped = lazyMap([1, 2, 3], fn);
    expect(fn).not.toHaveBeenCalled();
    mapped.next();
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("works on infinite sequences", () => {
    expect(first(lazyMap(naturals(), (n) => n * n), 4)).toEqual([1, 4, 9, 16]);
  });
});

describe("lazyFilter", () => {
  it("filters an array", () => {
    expect([...lazyFilter([1, 2, 3, 4], (n) => n % 2 === 0)]).toEqual([2, 4]);
  });

  it("chains with lazyMap over an infinite sequence", () => {
    const evensSquared = lazyMap(lazyFilter(naturals(), (n) => n % 2 === 0), (n) => n * n);
    expect(first(evensSquared, 3)).toEqual([4, 16, 36]);
  });

  it.todo("does no work until a value is requested");
});
