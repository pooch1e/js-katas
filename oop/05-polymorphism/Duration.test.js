/**
 * new Duration(ms) — ms is a non-negative integer (RangeError otherwise).
 *   toString() → "1h 30m 5s" (omit zero parts; "0s" for zero)
 *   toJSON() → { ms }
 *   [Symbol.toPrimitive]: "number" and "default" hints → ms;
 *     "string" hint → toString()
 *   Duration.parse("1h 30m") → Duration (accepts h, m, s parts in that order)
 */
import { describe, it, expect } from "vitest";
import { Duration } from "./Duration.js";

const H = 3_600_000;
const M = 60_000;
const S = 1_000;

describe("Duration", () => {
  it("formats as hours, minutes and seconds", () => {
    expect(new Duration(H + 30 * M + 5 * S).toString()).toBe("1h 30m 5s");
  });

  it("omits zero parts", () => {
    expect(new Duration(2 * H).toString()).toBe("2h");
    expect(new Duration(45 * S).toString()).toBe("45s");
  });

  it("uses the string form in template literals", () => {
    expect(`${new Duration(90 * S)}`).toBe("1m 30s");
  });

  it("compares and adds like a number", () => {
    expect(new Duration(2 * M) > new Duration(90 * S)).toBe(true);
    expect(new Duration(M) + new Duration(M)).toBe(2 * M);
  });

  it("serialises to JSON", () => {
    expect(JSON.stringify({ d: new Duration(1500) })).toBe('{"d":{"ms":1500}}');
  });

  it("parses a string", () => {
    expect(Number(Duration.parse("1h 30m"))).toBe(H + 30 * M);
  });

  it.todo("formats zero as '0s'");

  it.todo("rejects negative durations with a RangeError");

  it.todo("round-trips: Duration.parse(String(d)) equals d for whole seconds");
});
