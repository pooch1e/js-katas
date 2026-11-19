/**
 * new Thermostat({ min = 10, max = 30, target = 20 })
 *   target — getter/setter; values outside [min, max] are clamped
 *   min, max — read-only getters
 *   setRange(min, max) — RangeError if min > max; re-clamps target
 * The constructor clamps target too, and rejects min > max.
 */
import { describe, it, expect } from "vitest";
import { Thermostat } from "./Thermostat.js";

describe("Thermostat", () => {
  it("uses defaults", () => {
    const t = new Thermostat();
    expect([t.min, t.target, t.max]).toEqual([10, 20, 30]);
  });

  it("clamps a target that is too high or too low", () => {
    const t = new Thermostat();
    t.target = 99;
    expect(t.target).toBe(30);
    t.target = -5;
    expect(t.target).toBe(10);
  });

  it("re-clamps the target when the range shrinks", () => {
    const t = new Thermostat({ target: 25 });
    t.setRange(15, 22);
    expect(t.target).toBe(22);
  });

  it("rejects an inverted range", () => {
    expect(() => new Thermostat().setRange(30, 10)).toThrow(RangeError);
  });

  it.todo("clamps the target given to the constructor");

  it.todo("leaves the old range in place when setRange throws");

  it.todo("does not allow assigning min or max directly");
});
