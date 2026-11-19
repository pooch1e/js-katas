/**
 * caesarCipher — shifts letters along the alphabet, keeps their case, and
 * leaves non-letters alone.
 */
import { describe, it, expect } from "vitest";
import { caesarCipher } from "./caesarCipher.js";

describe("caesarCipher", () => {
  it("shifts lower-case letters", () => {
    expect(caesarCipher("abc", 1)).toBe("bcd");
  });

  it("wraps from z back to a", () => {
    expect(caesarCipher("xyz", 3)).toBe("abc");
  });

  it("keeps upper case upper", () => {
    expect(caesarCipher("Hello", 1)).toBe("Ifmmp");
  });

  it("leaves spaces and punctuation alone", () => {
    expect(caesarCipher("hi, you!", 1)).toBe("ij, zpv!");
  });

  // JS's % keeps the sign: -1 % 26 is -1. You need a fix for that.
  it("shifts backwards with a negative shift", () => {
    expect(caesarCipher("abc", -1)).toBe("zab");
  });

  it.todo("handles shifts larger than 26 (a shift of 27 behaves like 1)");
});
