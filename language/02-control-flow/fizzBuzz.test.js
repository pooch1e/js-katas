/**
 * fizzBuzz — for 1..n: "Fizz" for multiples of 3, "Buzz" for multiples of 5,
 * "FizzBuzz" for both, otherwise the number as a string.
 */
import { describe, it, expect } from "vitest";
import { fizzBuzz } from "./fizzBuzz.js";

describe("fizzBuzz", () => {
  it("returns numbers as strings", () => {
    expect(fizzBuzz(2)).toEqual(["1", "2"]);
  });

  it("replaces multiples of 3 with Fizz", () => {
    expect(fizzBuzz(3)).toEqual(["1", "2", "Fizz"]);
  });

  it("replaces multiples of 5 with Buzz", () => {
    expect(fizzBuzz(5)[4]).toBe("Buzz");
  });

  it("replaces multiples of both with FizzBuzz", () => {
    expect(fizzBuzz(15)[14]).toBe("FizzBuzz");
  });

  it("returns the full sequence to 15", () => {
    expect(fizzBuzz(15)).toEqual([
      "1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8",
      "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz",
    ]);
  });

  it.todo("returns an empty array for 0");
});
