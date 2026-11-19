/**
 * Employee(name, salary) — describe() → "<name> earns <salary>";
 *   giveRaise(percent) increases salary (rounded to a whole number), returns this.
 * Manager(name, salary, reports = []) extends Employee —
 *   addReport(employee) returns this;
 *   describe() → the Employee description + " and manages <n> people";
 *   giveRaise(percent) gives the manager the raise plus 5 extra percentage points.
 */
import { describe, it, expect } from "vitest";
import { Employee, Manager } from "./employees.js";

describe("Employee", () => {
  it("describes itself", () => {
    expect(new Employee("Ada", 50000).describe()).toBe("Ada earns 50000");
  });

  it("gets a raise", () => {
    expect(new Employee("Ada", 50000).giveRaise(10).salary).toBe(55000);
  });
});

describe("Manager", () => {
  it("is an Employee", () => {
    expect(new Manager("Bo", 80000)).toBeInstanceOf(Employee);
  });

  it("extends the description using super", () => {
    const m = new Manager("Bo", 80000);
    m.addReport(new Employee("Ada", 50000)).addReport(new Employee("Cy", 40000));
    expect(m.describe()).toBe("Bo earns 80000 and manages 2 people");
  });

  it("gets 5 extra points on a raise", () => {
    expect(new Manager("Bo", 80000).giveRaise(10).salary).toBe(92000);
  });

  it.todo("rounds raises to a whole number");

  // A shared default array would be shared by every manager.
  it.todo("keeps each manager's reports separate");
});
