/**
 * Shared state: { name, position: 0, battery: 100 }.
 *   canWalk(state)   → { walk(steps) } — position += steps; returns
 *                      "<name> walked to <position>". Robots (anything with
 *                      a battery behaviour) also lose 1 battery per step and
 *                      throw a plain Error containing "battery" if there isn't enough.
 *   canBark(state)   → { bark() } → "<name>: Woof!"
 *   canCharge(state) → { charge() } → battery back to 100; returns battery
 * createDog = walk + bark. createRobot = walk + charge. createRobotDog = all three.
 * Expose state through getters: position, and battery (robots only).
 */
import { describe, it, expect } from "vitest";
import { createDog, createRobot, createRobotDog } from "./robotDog.js";

describe("composed creatures", () => {
  it("lets a dog walk and bark", () => {
    const d = createDog("Rex");
    expect(d.walk(3)).toBe("Rex walked to 3");
    expect(d.bark()).toBe("Rex: Woof!");
  });

  it("does not give a dog charge()", () => {
    expect(createDog("Rex").charge).toBeUndefined();
  });

  it("drains a robot's battery when it walks", () => {
    const r = createRobot("R2");
    r.walk(30);
    expect(r.battery).toBe(70);
    expect(r.position).toBe(30);
  });

  it("refuses to walk a robot further than its battery allows", () => {
    const r = createRobot("R2");
    expect(() => r.walk(101)).toThrow(/battery/);
  });

  it("gives a robot dog all three behaviours", () => {
    const rd = createRobotDog("K9");
    rd.walk(50);
    expect(rd.bark()).toBe("K9: Woof!");
    expect(rd.charge()).toBe(100);
  });

  it.todo("does not drain a normal dog (no battery at all)");

  it.todo("keeps each creature's state separate");
});
