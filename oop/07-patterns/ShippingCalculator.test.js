/**
 * Strategies are objects with cost(order) → number. order is { weightKg, total }.
 *   flatRate          → 5
 *   byWeight          → 2 per kg, rounded up to the next whole kg
 *   freeOver(t, fb)   → 0 when order.total >= t, otherwise fb.cost(order)
 * new ShippingCalculator()
 *   register(name, strategy) → this
 *   calculate(name, order)   → the strategy's cost; UnknownStrategyError if missing
 *   methods                  → registered names, in registration order
 */
import { describe, it, expect } from "vitest";
import { ShippingCalculator, UnknownStrategyError, flatRate, byWeight, freeOver } from "./ShippingCalculator.js";

const order = { weightKg: 2.3, total: 40 };

describe("strategies", () => {
  it("charges a flat rate", () => {
    expect(flatRate.cost(order)).toBe(5);
  });

  it("charges by weight, rounding up", () => {
    expect(byWeight.cost(order)).toBe(6);
  });

  it("is free over a threshold, otherwise falls back", () => {
    const s = freeOver(50, flatRate);
    expect(s.cost({ weightKg: 1, total: 60 })).toBe(0);
    expect(s.cost({ weightKg: 1, total: 10 })).toBe(5);
  });
});

describe("ShippingCalculator", () => {
  it("uses the named strategy", () => {
    const calc = new ShippingCalculator().register("standard", flatRate).register("heavy", byWeight);
    expect(calc.calculate("heavy", order)).toBe(6);
  });

  it("accepts strategies it has never seen", () => {
    const calc = new ShippingCalculator().register("drone", { cost: (o) => o.weightKg * 10 });
    expect(calc.calculate("drone", { weightKg: 1, total: 0 })).toBe(10);
  });

  it("throws UnknownStrategyError for a missing name", () => {
    expect(() => new ShippingCalculator().calculate("teleport", order)).toThrow(UnknownStrategyError);
  });

  it.todo("lists registered methods in order");

  it.todo("replaces a strategy registered under an existing name");
});
