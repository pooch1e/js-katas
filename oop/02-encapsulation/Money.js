/**
 * Money — an immutable amount of integer cents in a currency.
 * See README.md › Money.
 */
export class CurrencyMismatchError extends Error {}

export class Money {
  constructor(cents, currency) {
    throw new Error("TODO: implement Money");
  }

  add(other) {}

  subtract(other) {}

  multiply(factor) {}

  equals(other) {}

  toString() {}

  static fromDecimal(amount, currency) {}
}
