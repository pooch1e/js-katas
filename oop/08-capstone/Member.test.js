/**
 * Member — see README.md › The spec › Member.
 */
import { describe, it, expect } from "vitest";
import { Member } from "./Member.js";

describe("Member", () => {
  it("defaults to a standard member with a limit of 3", () => {
    const m = new Member({ id: "m1", name: "Ada" });
    expect(m.type).toBe("standard");
    expect(m.borrowLimit).toBe(3);
  });

  it("gives premium members a limit of 10", () => {
    expect(new Member({ id: "m2", name: "Bo", type: "premium" }).borrowLimit).toBe(10);
  });

  it("rejects unknown member types", () => {
    expect(() => new Member({ id: "m3", name: "Cy", type: "gold" })).toThrow(TypeError);
  });

  it("starts with no fines", () => {
    expect(new Member({ id: "m1", name: "Ada" }).fines).toBe(0);
  });

  it.todo("refuses to pay a fine when nothing is owed (RangeError)");

  it.todo("does not allow fines to be assigned directly");
});
