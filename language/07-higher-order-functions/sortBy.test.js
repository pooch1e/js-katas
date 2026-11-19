/**
 * sortBy(arr, keyFn, direction = "asc") — returns a new sorted array.
 * Works for number keys and string keys. direction is "asc" or "desc".
 */
import { describe, it, expect } from "vitest";
import { sortBy } from "./sortBy.js";

const people = [
  { name: "Cy", age: 9 },
  { name: "Ada", age: 36 },
  { name: "Bo", age: 10 },
];

describe("sortBy", () => {
  // The default sort compares as strings, so 10 comes before 9.
  it("sorts by a number key", () => {
    expect(sortBy(people, (p) => p.age).map((p) => p.age)).toEqual([9, 10, 36]);
  });

  it("sorts by a string key", () => {
    expect(sortBy(people, (p) => p.name).map((p) => p.name)).toEqual(["Ada", "Bo", "Cy"]);
  });

  it("sorts descending", () => {
    expect(sortBy(people, (p) => p.age, "desc").map((p) => p.age)).toEqual([36, 10, 9]);
  });

  it("does not mutate the input", () => {
    const copy = [...people];
    sortBy(people, (p) => p.age);
    expect(people).toEqual(copy);
  });

  it.todo("keeps the original order of items with equal keys (sort is stable)");
});
