/**
 * new Point(x, y) — TypeError unless both are finite numbers.
 *   add(other) → new Point; distanceTo(other) → number; equals(other) → boolean
 *   toString() → "(x, y)"; Point.origin() → (0, 0); Point.fromArray([x, y])
 */
import { describe, it, expect } from "vitest";
import { Point } from "./Point.js";

describe("Point", () => {
  it("stores x and y", () => {
    const p = new Point(3, 4);
    expect(p.x).toBe(3);
    expect(p.y).toBe(4);
  });

  it("is an instance of Point", () => {
    expect(new Point(0, 0)).toBeInstanceOf(Point);
  });

  it("throws a TypeError for non-numeric coordinates", () => {
    expect(() => new Point("3", 4)).toThrow(TypeError);
    expect(() => new Point(NaN, 4)).toThrow(TypeError);
  });

  it("adds points into a new point", () => {
    const a = new Point(1, 2);
    const sum = a.add(new Point(3, 4));
    expect([sum.x, sum.y]).toEqual([4, 6]);
    expect(sum).not.toBe(a);
    expect([a.x, a.y]).toEqual([1, 2]);
  });

  it("measures distance", () => {
    expect(new Point(0, 0).distanceTo(new Point(3, 4))).toBe(5);
  });

  it("formats with toString and template literals", () => {
    expect(`${new Point(1, -2)}`).toBe("(1, -2)");
  });

  it.todo("compares by value with equals");

  it.todo("creates the origin with Point.origin()");

  it.todo("creates a point from an [x, y] array with Point.fromArray");
});
