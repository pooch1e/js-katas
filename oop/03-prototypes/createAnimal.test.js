/**
 * animalMethods — a plain object holding speak() → "<name> says <sound>"
 *   and rename(newName) (returns this).
 * createAnimal(name, sound) — returns an object created with
 *   Object.create(animalMethods), with own name and sound.
 */
import { describe, it, expect } from "vitest";
import { animalMethods, createAnimal } from "./createAnimal.js";

describe("createAnimal", () => {
  it("speaks", () => {
    expect(createAnimal("Cat", "meow").speak()).toBe("Cat says meow");
  });

  it("links to animalMethods", () => {
    expect(Object.getPrototypeOf(createAnimal("Cow", "moo"))).toBe(animalMethods);
  });

  it("keeps data as own properties", () => {
    const a = createAnimal("Cow", "moo");
    expect(Object.keys(a).sort()).toEqual(["name", "sound"]);
  });

  it("shares methods between animals", () => {
    expect(createAnimal("A", "a").speak).toBe(createAnimal("B", "b").speak);
  });

  it.todo("renames and chains: rename('Kitty').speak()");

  // Adding a method to animalMethods after creation: does an existing animal get it?
  it.todo("picks up methods added to animalMethods later");
});
