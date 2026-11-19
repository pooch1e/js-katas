/**
 * hotPotato(players, passes) → { eliminated: [...in order], winner }.
 * The potato starts with players[0]. Each round it is passed `passes` times
 * (front goes to the back), then the player holding it (now at the front) is out.
 */
import { describe, it, expect } from "vitest";
import { hotPotato } from "./hotPotato.js";

describe("hotPotato", () => {
  it("names the winner", () => {
    expect(hotPotato(["a", "b", "c", "d", "e"], 7).winner).toBe("a");
  });

  it("records the elimination order", () => {
    expect(hotPotato(["a", "b", "c", "d", "e"], 7).eliminated).toEqual(["c", "b", "e", "d"]);
  });

  it("eliminates in order with 0 passes", () => {
    expect(hotPotato(["a", "b", "c"], 0)).toEqual({ eliminated: ["a", "b"], winner: "c" });
  });

  it.todo("declares the only player the winner with nothing eliminated");

  it.todo("does not mutate the players array");
});
