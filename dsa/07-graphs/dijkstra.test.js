/**
 * dijkstra(graph, start) — graph is { node: [[neighbour, weight], ...] }
 * with non-negative weights. Returns { node: distance } for every node
 * that appears in the graph (as a key or neighbour); Infinity if unreachable.
 */
import { describe, it, expect } from "vitest";
import { dijkstra } from "./dijkstra.js";

const graph = {
  A: [["B", 4], ["C", 1]],
  B: [["D", 1]],
  C: [["B", 2], ["D", 5]],
  D: [],
};

describe("dijkstra", () => {
  it("is 0 to the start", () => {
    expect(dijkstra(graph, "A").A).toBe(0);
  });

  // The direct A→B edge costs 4, but A→C→B costs 3.
  it("prefers a cheaper multi-hop path over a direct edge", () => {
    expect(dijkstra(graph, "A").B).toBe(3);
  });

  it("returns every distance", () => {
    expect(dijkstra(graph, "A")).toEqual({ A: 0, B: 3, C: 1, D: 4 });
  });

  it("marks unreachable nodes as Infinity", () => {
    expect(dijkstra({ A: [["B", 1]], B: [], Z: [] }, "A").Z).toBe(Infinity);
  });

  it.todo("works from a different start node");

  it.todo("handles zero-weight edges");
});
