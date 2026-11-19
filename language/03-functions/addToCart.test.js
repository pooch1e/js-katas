/**
 * addToCart(cart, item) — cart is { items: [], total: 0 }; item is
 * { name, price }. Returns a new cart with the item appended and total
 * updated. The original cart must be unchanged.
 */
import { describe, it, expect } from "vitest";
import { addToCart } from "./addToCart.js";

describe("addToCart", () => {
  it("adds the item and updates the total", () => {
    const cart = { items: [], total: 0 };
    expect(addToCart(cart, { name: "tea", price: 3 })).toEqual({
      items: [{ name: "tea", price: 3 }],
      total: 3,
    });
  });

  it("appends to existing items", () => {
    const cart = { items: [{ name: "tea", price: 3 }], total: 3 };
    const next = addToCart(cart, { name: "cake", price: 4 });
    expect(next.items.map((i) => i.name)).toEqual(["tea", "cake"]);
    expect(next.total).toBe(7);
  });

  it("returns a new cart object", () => {
    const cart = { items: [], total: 0 };
    expect(addToCart(cart, { name: "tea", price: 3 })).not.toBe(cart);
  });

  // The sneaky one: a new cart object that still shares the same items array.
  it("does not change the original cart or its items array", () => {
    const cart = { items: [], total: 0 };
    addToCart(cart, { name: "tea", price: 3 });
    expect(cart).toEqual({ items: [], total: 0 });
  });

  it.todo("can be called twice on the same cart to get two independent carts");
});
