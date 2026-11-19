/**
 * totalArea(shapes) — sum of shape.area() for every shape.
 * largest(shapes) — the shape with the biggest area (undefined if none).
 * Works with ANY object that has an area() method.
 */
import { describe, it, expect } from "vitest";
import { totalArea, largest } from "./totalArea.js";

class Rect {
  constructor(w, h) {
    this.w = w;
    this.h = h;
  }
  area() {
    return this.w * this.h;
  }
}

class Triangle {
  constructor(base, height) {
    this.base = base;
    this.height = height;
  }
  area() {
    return (this.base * this.height) / 2;
  }
}

describe("totalArea", () => {
  it("sums areas of one kind of shape", () => {
    expect(totalArea([new Rect(2, 3), new Rect(1, 1)])).toBe(7);
  });

  it("works with mixed shape classes", () => {
    expect(totalArea([new Rect(2, 3), new Triangle(4, 5)])).toBe(16);
  });

  it("works with plain objects that have an area method", () => {
    expect(totalArea([{ area: () => 10 }, new Rect(1, 2)])).toBe(12);
  });

  it("returns 0 for no shapes", () => {
    expect(totalArea([])).toBe(0);
  });

  it.todo("largest returns the biggest shape of any kind");

  it.todo("largest returns undefined for an empty list");
});
