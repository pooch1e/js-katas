/**
 * BankAccount / InsufficientFundsError — validation, chaining, history.
 * See README.md › BankAccount.
 */
export class InsufficientFundsError extends Error {}

export class BankAccount {
  constructor(owner, openingBalance = 0) {
    throw new Error("TODO: implement BankAccount");
  }

  deposit(amount) {}

  withdraw(amount) {}

  get balance() {}

  get statement() {}
}
