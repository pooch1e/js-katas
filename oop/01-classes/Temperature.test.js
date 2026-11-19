/**
 * new Temperature(celsius)
 *   celsius / fahrenheit — get and set (F = C × 9/5 + 32)
 *   kelvin — get only (K = C + 273.15)
 *   Temperature.fromFahrenheit(f)
 * Any value below absolute zero (−273.15 °C) throws a RangeError.
 */
import { describe, it, expect } from "vitest";
import { Temperature } from "./Temperature.js";

describe("Temperature", () => {
  it("reads Celsius", () => {
    expect(new Temperature(25).celsius).toBe(25);
  });

  it("converts to Fahrenheit", () => {
    expect(new Temperature(100).fahrenheit).toBe(212);
    expect(new Temperature(0).fahrenheit).toBe(32);
  });

  it("converts to Kelvin", () => {
    expect(new Temperature(0).kelvin).toBe(273.15);
  });

  it("updates Celsius when Fahrenheit is set", () => {
    const t = new Temperature(0);
    t.fahrenheit = 212;
    expect(t.celsius).toBe(100);
  });

  it("rejects temperatures below absolute zero", () => {
    expect(() => new Temperature(-300)).toThrow(RangeError);
  });

  // The setter needs the same check as the constructor. Can you reuse it?
  it("rejects setting Celsius below absolute zero", () => {
    const t = new Temperature(10);
    expect(() => {
      t.celsius = -274;
    }).toThrow(RangeError);
    expect(t.celsius).toBe(10);
  });

  it.todo("creates from Fahrenheit with Temperature.fromFahrenheit(32)");

  // Class bodies are strict mode, so assigning to a getter-only property throws.
  it.todo("throws a TypeError when assigning to kelvin, which has no setter");
});
