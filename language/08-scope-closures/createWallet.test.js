/**
 * createWallet(initial = 0) — returns { deposit(n), withdraw(n), balance(), history() }.
 *   deposit/withdraw return the new balance.
 *   Amounts must be positive numbers (RangeError otherwise).
 *   withdraw throws a plain Error with "insufficient funds" in its message if n > balance.
 *   history() returns a copy of [{ type: "deposit" | "withdraw", amount }].
 */
import { describe, it, expect } from "vitest";
import { createWallet } from "./createWallet.js";

describe("createWallet", () => {
  it("starts with the initial balance", () => {
    expect(createWallet(50).balance()).toBe(50);
  });

  it("deposits and withdraws", () => {
    const w = createWallet();
    expect(w.deposit(30)).toBe(30);
    expect(w.withdraw(10)).toBe(20);
    expect(w.balance()).toBe(20);
  });

  it("refuses to go overdrawn", () => {
    const w = createWallet(5);
    expect(() => w.withdraw(10)).toThrow(/insufficient funds/);
    expect(w.balance()).toBe(5);
  });

  it("rejects zero and negative amounts with a RangeError", () => {
    const w = createWallet(10);
    expect(() => w.deposit(0)).toThrow(RangeError);
    expect(() => w.withdraw(-5)).toThrow(RangeError);
  });

  it("records history", () => {
    const w = createWallet();
    w.deposit(10);
    w.withdraw(4);
    expect(w.history()).toEqual([
      { type: "deposit", amount: 10 },
      { type: "withdraw", amount: 4 },
    ]);
  });

  // If history() returns the real array, a caller can push fake entries into it.
  it.todo("returns a copy from history(), so pushing onto it changes nothing");

  it.todo("has no balance property to tamper with (w.balance = 1e6 does nothing useful)");
});
