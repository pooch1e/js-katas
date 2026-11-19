/**
 * hasPath(graph, start, end) — graph is an adjacency list
 * { node: [neighbours] } of directed edges. Nodes with no outgoing edges may
 * be missing as keys.
 */
import { describe, it, expect } from "vitest";
import { hasPath } from "./hasPath.js";

const graph = {
  a: ["b", "c"],
  b: ["d"],
  c: ["e"],
  d: [],
  e: ["b"],
  x: ["y"],
};

describe("hasPath", () => {
  it("finds a direct edge", () => {
    expect(hasPath(graph, "a", "b")).toBe(true);
  });

  it("finds a multi-step path", () => {
    expect(hasPath(graph, "a", "d")).toBe(true);
  });

  it("respects edge direction", () => {
    expect(hasPath(graph, "d", "a")).toBe(false);
  });

  it("returns false for disconnected nodes", () => {
    expect(hasPath(graph, "a", "y")).toBe(false);
  });

  // Without a visited set, this one loops forever.
  it("terminates on a graph with a cycle", () => {
    const cyclic = { a: ["b"], b: ["c"], c: ["a"] };
    expect(hasPath(cyclic, "a", "z")).toBe(false);
  });

  it.todo("treats start === end as a path");

  it.todo("handles nodes that aren't keys in the graph (y has no entry)");
});
