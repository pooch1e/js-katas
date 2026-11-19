/**
 * groupBy(arr, keyFn) — { [key]: items[] }, preserving the input order inside each group.
 */
import { describe, it, expect } from "vitest";
import { groupBy } from "./groupBy.js";

describe("groupBy", () => {
  it("groups numbers by parity", () => {
    expect(groupBy([1, 2, 3, 4], (n) => (n % 2 ? "odd" : "even"))).toEqual({
      odd: [1, 3],
      even: [2, 4],
    });
  });

  it("groups objects by a property", () => {
    const people = [
      { name: "Ada", team: "red" },
      { name: "Bo", team: "blue" },
      { name: "Cy", team: "red" },
    ];
    const groups = groupBy(people, (p) => p.team);
    expect(groups.red.map((p) => p.name)).toEqual(["Ada", "Cy"]);
    expect(groups.blue.map((p) => p.name)).toEqual(["Bo"]);
  });

  it("returns an empty object for an empty array", () => {
    expect(groupBy([], (x) => x)).toEqual({});
  });

  it.todo("groups words by their length (keys become strings)");
});
