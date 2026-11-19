/**
 * ShippingCalculator / UnknownStrategyError — the strategy pattern.
 * See README.md › ShippingCalculator.
 */
export class UnknownStrategyError extends Error {}

export class ShippingCalculator {
  constructor() {
    throw new Error("TODO: implement ShippingCalculator");
  }

  register(name, strategy) {}

  calculate(name, order) {}

  get methods() {}
}

export const flatRate = {};

export const byWeight = {};

export const freeOver = (threshold, fallback) => ({});
