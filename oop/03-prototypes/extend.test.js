/**
 * extend(Child, Parent) — makes Child.prototype inherit from
 * Parent.prototype, restores Child.prototype.constructor (non-enumerable),
 * and returns Child. Don't use class/extends or Object.setPrototypeOf.
 */
import { describe, it, expect } from "vitest";
import { extend } from "./extend.js";

function makeShapes() {
  function Shape(name) {
    this.name = name;
  }
  Shape.prototype.describe = function () {
    return `${this.name} with area ${this.area()}`;
  };

  function Square(side) {
    Shape.call(this, "square");
    this.side = side;
  }
  extend(Square, Shape);
  Square.prototype.area = function () {
    return this.side ** 2;
  };
  return { Shape, Square };
}

describe("extend", () => {
  it("lets child instances use parent methods", () => {
    const { Square } = makeShapes();
    expect(new Square(3).describe()).toBe("square with area 9");
  });

  it("makes instanceof work for both", () => {
    const { Shape, Square } = makeShapes();
    const s = new Square(2);
    expect(s).toBeInstanceOf(Square);
    expect(s).toBeInstanceOf(Shape);
  });

  it("restores the constructor property", () => {
    const { Square } = makeShapes();
    expect(new Square(1).constructor).toBe(Square);
  });

  it("keeps constructor non-enumerable", () => {
    const { Square } = makeShapes();
    expect(Object.keys(Square.prototype)).toEqual(["area"]);
  });

  it.todo("does not add child methods to the parent's prototype");

  it.todo("returns Child");
});
