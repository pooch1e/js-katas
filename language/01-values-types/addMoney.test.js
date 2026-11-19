/**
 * addMoney — adds two amounts of money, returning a number rounded to cents.
 */
import { describe, it, expect } from "vitest";
import { addMoney } from "./addMoney.js";

describe("addMoney", () => {
  it("adds whole amounts", () => {
    expect(addMoney(2, 3)).toBe(5);
  });

  // Try `0.1 + 0.2` in the node REPL first.
  it("adds 0.1 and 0.2 to exactly 0.3", () => {
    expect(addMoney(0.1, 0.2)).toBe(0.3);
  });

  it("rounds to 2 decimal places", () => {
    expect(addMoney(1.111, 2.222)).toBe(3.33);
  });

  it.todo("handles negative amounts (refunds)");
});
