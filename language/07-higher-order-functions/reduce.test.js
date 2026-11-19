/**
 * reduce(arr, fn, initial?) — fn(acc, item, index, arr). With no initial
 * value, the first item is the starting acc. Throws a TypeError on an
 * empty array with no initial value.
 */
import { describe, it, expect } from "vitest";
import { reduce } from "./reduce.js";

describe("reduce", () => {
  it("sums with an initial value", () => {
    expect(reduce([1, 2, 3], (acc, n) => acc + n, 0)).toBe(6);
  });

  it("uses the first item when there is no initial value", () => {
    expect(reduce([1, 2, 3], (acc, n) => acc + n)).toBe(6);
    expect(reduce(["a", "b"], (acc, s) => acc + s)).toBe("ab");
  });

  it("returns the initial value for an empty array", () => {
    expect(reduce([], (acc, n) => acc + n, 10)).toBe(10);
  });

  it("throws a TypeError for an empty array with no initial value", () => {
    expect(() => reduce([], (acc, n) => acc + n)).toThrow(TypeError);
  });

  it("can build an object", () => {
    const byId = reduce([{ id: 1, n: "a" }, { id: 2, n: "b" }], (acc, x) => ({ ...acc, [x.id]: x.n }), {});
    expect(byId).toEqual({ 1: "a", 2: "b" });
  });

  it("passes the index, starting at 1 when there is no initial value", () => {
    const seen = [];
    reduce([5, 6, 7], (acc, _, i) => { seen.push(i); return acc; });
    expect(seen).toEqual([1, 2]);
  });

  // reduce(arr, fn, undefined) is NOT the same as reduce(arr, fn).
  it.todo("treats an explicit undefined initial value as a real initial value");
});
