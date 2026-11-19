/**
 * TrafficLight — starts "red".
 *   next(): red → green → yellow → red. From "flashing", next() throws
 *     InvalidTransitionError. Returns this.
 *   emergency(): any state → "flashing". Returns this.
 *   reset(): only from "flashing" → "red"; otherwise InvalidTransitionError.
 *   state — getter; canGo — true only when green.
 *   history — array of states visited, starting with "red".
 */
import { describe, it, expect } from "vitest";
import { TrafficLight, InvalidTransitionError } from "./TrafficLight.js";

describe("TrafficLight", () => {
  it("starts red", () => {
    expect(new TrafficLight().state).toBe("red");
  });

  it("cycles red → green → yellow → red", () => {
    const t = new TrafficLight();
    expect([t.next().state, t.next().state, t.next().state]).toEqual(["green", "yellow", "red"]);
  });

  it("only allows going on green", () => {
    const t = new TrafficLight();
    expect(t.canGo).toBe(false);
    expect(t.next().canGo).toBe(true);
    expect(t.next().canGo).toBe(false);
  });

  it("switches to flashing in an emergency from any state", () => {
    expect(new TrafficLight().next().emergency().state).toBe("flashing");
  });

  it("refuses next() while flashing", () => {
    const t = new TrafficLight().emergency();
    expect(() => t.next()).toThrow(InvalidTransitionError);
  });

  it("resets from flashing to red", () => {
    expect(new TrafficLight().emergency().reset().state).toBe("red");
  });

  it.todo("refuses reset() when not flashing");

  it.todo("records history of every state visited");
});
