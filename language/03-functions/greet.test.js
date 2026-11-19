/**
 * greet(name = "friend", greeting = "Hello") → "<greeting>, <name>!"
 */
import { describe, it, expect } from "vitest";
import { greet } from "./greet.js";

describe("greet", () => {
  it("greets by name", () => {
    expect(greet("Ada")).toBe("Hello, Ada!");
  });

  it("uses a custom greeting", () => {
    expect(greet("Ada", "Hi")).toBe("Hi, Ada!");
  });

  it("defaults the name to 'friend'", () => {
    expect(greet()).toBe("Hello, friend!");
  });

  it("uses the default name when undefined is passed explicitly", () => {
    expect(greet(undefined, "Hey")).toBe("Hey, friend!");
  });

  // Defaults only kick in for undefined. What does null do?
  it.todo("prints 'null' when null is passed as the name");
});
