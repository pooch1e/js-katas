/**
 * makeRectangle(width, height) → { width, height, area(), perimeter(), scale(factor) }
 * scale multiplies both sides in place and returns the rectangle for chaining.
 */
import { describe, it, expect } from "vitest";
import { makeRectangle } from "./makeRectangle.js";

describe("makeRectangle", () => {
  it("exposes width and height", () => {
    const r = makeRectangle(3, 4);
    expect(r.width).toBe(3);
    expect(r.height).toBe(4);
  });

  it("computes area and perimeter", () => {
    const r = makeRectangle(3, 4);
    expect(r.area()).toBe(12);
    expect(r.perimeter()).toBe(14);
  });

  // A closure over the original arguments fails this. The methods must read `this`.
  it("sees changes made to its properties later", () => {
    const r = makeRectangle(3, 4);
    r.width = 10;
    expect(r.area()).toBe(40);
  });

  it("scales in place and can be chained", () => {
    const r = makeRectangle(1, 2);
    expect(r.scale(3).area()).toBe(18);
    expect(r.width).toBe(3);
  });

  it.todo("loses `this` when area is detached: `const f = r.area; f()` throws a TypeError");
});
