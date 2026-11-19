/**
 * new Money(cents, currency) — cents must be an integer (TypeError).
 * Frozen: no field can change and none can be added.
 *   add / subtract(other) → new Money; CurrencyMismatchError on different currencies
 *   multiply(factor) → new Money, rounded to the nearest cent
 *   equals(other); toString() → "12.34 GBP"
 *   Money.fromDecimal(12.34, "GBP") → 1234 cents
 */
import { describe, it, expect } from "vitest";
import { Money, CurrencyMismatchError } from "./Money.js";

describe("Money", () => {
  it("stores cents and currency", () => {
    const m = new Money(1234, "GBP");
    expect(m.cents).toBe(1234);
    expect(m.currency).toBe("GBP");
  });

  it("rejects fractional cents", () => {
    expect(() => new Money(12.5, "GBP")).toThrow(TypeError);
  });

  it("is frozen", () => {
    const m = new Money(100, "GBP");
    expect(Object.isFrozen(m)).toBe(true);
  });

  it("adds into a new Money", () => {
    const a = new Money(100, "GBP");
    const sum = a.add(new Money(250, "GBP"));
    expect(sum.cents).toBe(350);
    expect(a.cents).toBe(100);
  });

  it("refuses to mix currencies", () => {
    expect(() => new Money(1, "GBP").add(new Money(1, "USD"))).toThrow(CurrencyMismatchError);
  });

  it("formats as a decimal string", () => {
    expect(`${new Money(1234, "GBP")}`).toBe("12.34 GBP");
    expect(`${new Money(5, "EUR")}`).toBe("0.05 EUR");
  });

  // 0.1 + 0.2 trouble again. Round when converting.
  it("creates from a decimal amount", () => {
    expect(Money.fromDecimal(0.1 + 0.2, "GBP").cents).toBe(30);
  });

  it.todo("subtracts, and can go negative");

  it.todo("multiplies and rounds to the nearest cent (1.99 × 3 = 5.97)");

  it.todo("compares by value with equals (same cents and currency)");
});
