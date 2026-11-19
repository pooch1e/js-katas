/**
 * isPrime — primality check by trial division.
 */
import { describe, it, expect } from "vitest";
import { isPrime } from "./isPrime.js";

describe("isPrime", () => {
  it("knows the small primes", () => {
    for (const p of [2, 3, 5, 7, 11, 13]) expect(isPrime(p)).toBe(true);
  });

  it("rejects small composites", () => {
    for (const c of [4, 6, 8, 9, 15]) expect(isPrime(c)).toBe(false);
  });

  it("says 0 and 1 are not prime", () => {
    expect(isPrime(0)).toBe(false);
    expect(isPrime(1)).toBe(false);
  });

  // This one is slow unless you stop checking at √n.
  it("handles a large prime quickly", () => {
    expect(isPrime(2_147_483_647)).toBe(true);
  });

  it.todo("says negative numbers and non-integers like 7.5 are not prime");
});
