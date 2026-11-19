/**
 * Employee, Manager — super in constructors and overridden methods.
 * See README.md › Employee and Manager.
 */
export class Employee {
  constructor(name, salary) {
    throw new Error("TODO: implement Employee");
  }

  describe() {}

  giveRaise(percent) {}
}

export class Manager extends Employee {}
