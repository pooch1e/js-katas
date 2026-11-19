/**
 * new OrderService({ inventory, payments, notifier, clock })
 *   inventory: { inStock(sku) → number, reserve(sku, qty), release(sku, qty) }
 *   payments:  { charge(email, amount) → Promise<{ id }> }  (may reject)
 *   notifier:  { send(email, message) }
 *   clock:     { now() → number }
 *
 * placeOrder({ customerEmail, sku, quantity, unitPrice }) →
 *   1. if inStock(sku) < quantity → throw OutOfStockError (nothing reserved/charged)
 *   2. reserve(sku, quantity)
 *   3. charge(customerEmail, quantity * unitPrice)
 *        on rejection: release(sku, quantity), then throw PaymentFailedError
 *        with the original error as its cause
 *   4. send(customerEmail, "Order confirmed: <quantity> x <sku>")
 *   5. return { paymentId, total, placedAt: clock.now() }
 */
import { describe, it, expect, vi } from "vitest";
import { OrderService, OutOfStockError, PaymentFailedError } from "./OrderService.js";

class CardDeclined extends Error {}

function makeFakes({ stock = 10, chargeFails = false } = {}) {
  const calls = [];
  const inventory = {
    inStock: vi.fn(() => stock),
    reserve: vi.fn((sku, qty) => calls.push(["reserve", sku, qty])),
    release: vi.fn((sku, qty) => calls.push(["release", sku, qty])),
  };
  const payments = {
    charge: vi.fn(async (email, amount) => {
      calls.push(["charge", email, amount]);
      if (chargeFails) throw new CardDeclined("declined");
      return { id: "pay_1" };
    }),
  };
  const notifier = { send: vi.fn((email, msg) => calls.push(["send", email, msg])) };
  const clock = { now: () => 1_700_000_000_000 };
  return { deps: { inventory, payments, notifier, clock }, calls };
}

const order = { customerEmail: "ada@x.io", sku: "TEA", quantity: 2, unitPrice: 350 };

describe("OrderService", () => {
  it("places an order and returns a receipt", async () => {
    const { deps } = makeFakes();
    await expect(new OrderService(deps).placeOrder(order)).resolves.toEqual({
      paymentId: "pay_1",
      total: 700,
      placedAt: 1_700_000_000_000,
    });
  });

  it("reserves, charges and notifies in that order", async () => {
    const { deps, calls } = makeFakes();
    await new OrderService(deps).placeOrder(order);
    expect(calls).toEqual([
      ["reserve", "TEA", 2],
      ["charge", "ada@x.io", 700],
      ["send", "ada@x.io", "Order confirmed: 2 x TEA"],
    ]);
  });

  it("refuses out-of-stock orders without touching anything", async () => {
    const { deps, calls } = makeFakes({ stock: 1 });
    await expect(new OrderService(deps).placeOrder(order)).rejects.toThrow(OutOfStockError);
    expect(calls).toEqual([]);
  });

  it("releases stock and throws PaymentFailedError when the charge fails", async () => {
    const { deps, calls } = makeFakes({ chargeFails: true });
    await expect(new OrderService(deps).placeOrder(order)).rejects.toThrow(PaymentFailedError);
    expect(calls).toEqual([
      ["reserve", "TEA", 2],
      ["charge", "ada@x.io", 700],
      ["release", "TEA", 2],
    ]);
  });

  it.todo("keeps the payment error as the PaymentFailedError's cause");

  it.todo("does not notify the customer when payment fails");
});
