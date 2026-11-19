/**
 * evaluateRpn(expression) — space-separated tokens; operators + - * /.
 * Division truncates towards zero. Throws a SyntaxError for malformed input
 * (too few operands, leftover operands, unknown tokens).
 */
import { describe, it, expect } from "vitest";
import { evaluateRpn } from "./evaluateRpn.js";

describe("evaluateRpn", () => {
  it("evaluates a single operation", () => {
    expect(evaluateRpn("3 4 +")).toBe(7);
  });

  it("evaluates chained operations", () => {
    expect(evaluateRpn("3 4 + 2 *")).toBe(14);
  });

  it("gets operand order right for - and /", () => {
    expect(evaluateRpn("10 3 -")).toBe(7);
    expect(evaluateRpn("20 4 /")).toBe(5);
  });

  it("truncates division towards zero", () => {
    expect(evaluateRpn("7 2 /")).toBe(3);
    expect(evaluateRpn("-7 2 /")).toBe(-3);
  });

  it("throws a SyntaxError when an operator lacks operands", () => {
    expect(() => evaluateRpn("3 +")).toThrow(SyntaxError);
  });

  it.todo("evaluates '4 13 5 / +' to 6");

  it.todo("throws a SyntaxError when operands are left over ('1 2')");

  it.todo("throws a SyntaxError for unknown tokens ('2 3 ^')");
});
