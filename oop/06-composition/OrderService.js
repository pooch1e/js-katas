/**
 * OrderService / OutOfStockError / PaymentFailedError — coordinates injected
 * collaborators. See README.md › OrderService.
 */
export class OutOfStockError extends Error {}

export class PaymentFailedError extends Error {}

export class OrderService {
  constructor({ inventory, payments, notifier, clock }) {
    throw new Error("TODO: implement OrderService");
  }

  async placeOrder({ customerEmail, sku, quantity, unitPrice }) {}
}
