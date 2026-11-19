/**
 * new BankAccount(owner, openingBalance = 0)
 *   owner must be a non-blank string (TypeError); openingBalance >= 0 (RangeError)
 *   deposit(n) / withdraw(n) — n must be > 0 (RangeError); return this
 *   withdraw throws InsufficientFundsError if n > balance
 *   balance — getter
 *   statement — getter: a copy of [{ type: "deposit" | "withdrawal", amount, balance }]
 */
import { describe, it, expect } from "vitest";
import { BankAccount, InsufficientFundsError } from "./BankAccount.js";

describe("BankAccount", () => {
  it("opens with an owner and balance", () => {
    const acc = new BankAccount("Ada", 50);
    expect(acc.owner).toBe("Ada");
    expect(acc.balance).toBe(50);
  });

  it("rejects a blank owner", () => {
    expect(() => new BankAccount("  ")).toThrow(TypeError);
  });

  it("deposits and withdraws with chaining", () => {
    const acc = new BankAccount("Ada");
    acc.deposit(100).withdraw(30).deposit(5);
    expect(acc.balance).toBe(75);
  });

  it("throws InsufficientFundsError when overdrawing", () => {
    const acc = new BankAccount("Ada", 10);
    expect(() => acc.withdraw(11)).toThrow(InsufficientFundsError);
    expect(acc.balance).toBe(10);
  });

  it("rejects non-positive amounts", () => {
    const acc = new BankAccount("Ada", 10);
    expect(() => acc.deposit(0)).toThrow(RangeError);
    expect(() => acc.withdraw(-1)).toThrow(RangeError);
  });

  it("records a statement with running balances", () => {
    const acc = new BankAccount("Ada");
    acc.deposit(100).withdraw(40);
    expect(acc.statement).toEqual([
      { type: "deposit", amount: 100, balance: 100 },
      { type: "withdrawal", amount: 40, balance: 60 },
    ]);
  });

  it.todo("rejects a negative opening balance with a RangeError");

  it.todo("returns a copy from statement, so pushing onto it changes nothing");

  it.todo("gives InsufficientFundsError the name 'InsufficientFundsError'");
});
