/**
 * topologicalSort(deps) — deps is { task: [tasks it depends on] }. Returns
 * every task (including ones only mentioned as dependencies), with each
 * after all of its dependencies. When several tasks are ready at once,
 * take them in alphabetical order. Throws CycleError on a cycle.
 */
import { describe, it, expect } from "vitest";
import { topologicalSort, CycleError } from "./topologicalSort.js";

const isValidOrder = (order, deps) =>
  Object.entries(deps).every(([task, needs]) => needs.every((n) => order.indexOf(n) < order.indexOf(task)));

describe("topologicalSort", () => {
  it("puts dependencies first", () => {
    const deps = { build: ["install"], test: ["build"], install: [] };
    expect(topologicalSort(deps)).toEqual(["install", "build", "test"]);
  });

  it("produces a valid order for a diamond", () => {
    const deps = { d: ["b", "c"], b: ["a"], c: ["a"], a: [] };
    const order = topologicalSort(deps);
    expect(isValidOrder(order, deps)).toBe(true);
    expect(order).toEqual(["a", "b", "c", "d"]);
  });

  it("includes tasks only mentioned as dependencies", () => {
    expect(topologicalSort({ app: ["lib"] })).toEqual(["lib", "app"]);
  });

  it("throws CycleError on a cycle", () => {
    expect(() => topologicalSort({ a: ["b"], b: ["c"], c: ["a"] })).toThrow(CycleError);
  });

  it.todo("returns [] for no tasks");

  it.todo("throws CycleError for a task that depends on itself");
});
