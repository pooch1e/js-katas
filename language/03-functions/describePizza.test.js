/**
 * describePizza({ size = "medium", crust = "thin", toppings = [] } = {})
 *   → "medium thin pizza with cheese, olives"
 *   → "medium thin pizza with no toppings" when toppings is empty
 */
import { describe, it, expect } from "vitest";
import { describePizza } from "./describePizza.js";

describe("describePizza", () => {
  it("describes a fully specified pizza", () => {
    expect(describePizza({ size: "large", crust: "deep", toppings: ["ham", "pineapple"] }))
      .toBe("large deep pizza with ham, pineapple");
  });

  it("fills in missing fields with defaults", () => {
    expect(describePizza({ toppings: ["basil"] })).toBe("medium thin pizza with basil");
  });

  it("says 'no toppings' when there are none", () => {
    expect(describePizza({ size: "small" })).toBe("small thin pizza with no toppings");
  });

  // Destructuring undefined throws a TypeError. The fix goes in the parameter list.
  it("works when called with no argument at all", () => {
    expect(describePizza()).toBe("medium thin pizza with no toppings");
  });

  it.todo("ignores option keys it doesn't know about");
});
