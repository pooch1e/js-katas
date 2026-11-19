/**
 * fibonacci() — yields the Fibonacci numbers forever, starting 0, 1.
 */
import { describe, it, expect } from "vitest";
import { fibonacci } from "./fibonacci.js";

const firstN = (iter, n) => {
  const out = [];
  for (const v of iter) {
    if (out.length === n) break;
    out.push(v);
  }
  return out;
};

describe("fibonacci", () => {
  it("starts with 0, 1", () => {
    expect(firstN(fibonacci(), 2)).toEqual([0, 1]);
  });

  it("yields the first 10 numbers", () => {
    expect(firstN(fibonacci(), 10)).toEqual([0, 1, 1, 2, 3, 5, 8, 13, 21, 34]);
  });

  it("gives independent sequences per call", () => {
    const a = fibonacci();
    a.next();
    a.next();
    expect(fibonacci().next().value).toBe(0);
  });

  it.todo("reaches 6765 as the 21st number (index 20)");
});
