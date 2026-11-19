/**
 * Shape (abstract), Circle, Rectangle, Square.
 * See README.md › Shapes.
 */
export class Shape {
  constructor() {
    throw new Error("TODO: implement Shape");
  }

  area() {}

  describe() {}
}

export class Circle extends Shape {}

export class Rectangle extends Shape {}

export class Square extends Rectangle {}
