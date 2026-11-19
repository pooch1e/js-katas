/**
 * makeIdGenerator(prefix) — returns a function producing "<prefix>-001",
 * "<prefix>-002", ... (numbers padded to at least 3 digits).
 */
import { describe, it, expect } from "vitest";
import { makeIdGenerator } from "./makeIdGenerator.js";

describe("makeIdGenerator", () => {
  it("starts at 001", () => {
    expect(makeIdGenerator("user")()).toBe("user-001");
  });

  it("counts up on each call", () => {
    const next = makeIdGenerator("order");
    next();
    expect(next()).toBe("order-002");
    expect(next()).toBe("order-003");
  });

  it("keeps generators independent", () => {
    const a = makeIdGenerator("a");
    const b = makeIdGenerator("b");
    a();
    a();
    expect(b()).toBe("b-001");
  });

  it.todo("keeps counting past 999 without truncating (user-1000)");
});
