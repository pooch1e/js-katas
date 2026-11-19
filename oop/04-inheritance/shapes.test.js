/**
 * Shape — abstract: `new Shape()` throws a TypeError. Base area() throws an
 *   Error whose message contains "must implement". describe() →
 *   "<ClassName> with area <area to 2 decimal places>".
 * Circle(radius), Rectangle(width, height), Square(side) — Square extends Rectangle.
 * Each has area() and perimeter().
 */
import { describe, it, expect } from "vitest";
import { Shape, Circle, Rectangle, Square } from "./shapes.js";

describe("Shape hierarchy", () => {
  it("can't instantiate Shape directly", () => {
    expect(() => new Shape()).toThrow(TypeError);
  });

  it("computes areas", () => {
    expect(new Rectangle(3, 4).area()).toBe(12);
    expect(new Square(5).area()).toBe(25);
    expect(new Circle(1).area()).toBeCloseTo(Math.PI);
  });

  it("computes perimeters", () => {
    expect(new Rectangle(3, 4).perimeter()).toBe(14);
    expect(new Circle(1).perimeter()).toBeCloseTo(2 * Math.PI);
  });

  it("shares describe() from the base class", () => {
    expect(new Circle(2).describe()).toBe("Circle with area 12.57");
    expect(new Square(2).describe()).toBe("Square with area 4.00");
  });

  it("sets up the is-a relationships", () => {
    const sq = new Square(1);
    expect(sq).toBeInstanceOf(Rectangle);
    expect(sq).toBeInstanceOf(Shape);
    expect(new Circle(1)).not.toBeInstanceOf(Rectangle);
  });

  it.todo("does not define describe() on the subclasses (Object.hasOwn on their prototypes)");

  // A subclass that forgets area() should fail loudly.
  it.todo("throws 'must implement' from a subclass that doesn't override area");

  it.todo("gives Square width and height equal to its side");
});
