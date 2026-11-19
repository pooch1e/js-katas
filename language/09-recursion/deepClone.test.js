/**
 * deepClone — returns a copy equal to the input that shares no arrays or
 * objects with it. Handles plain objects, arrays and primitives. Don't use
 * structuredClone or JSON.
 */
import { describe, it, expect } from "vitest";
import { deepClone } from "./deepClone.js";

describe("deepClone", () => {
  it("returns primitives as they are", () => {
    expect(deepClone(5)).toBe(5);
    expect(deepClone("x")).toBe("x");
    expect(deepClone(null)).toBeNull();
  });

  it("copies a flat object", () => {
    const obj = { a: 1, b: "two" };
    const copy = deepClone(obj);
    expect(copy).toEqual(obj);
    expect(copy).not.toBe(obj);
  });

  it("copies nested objects so nothing is shared", () => {
    const obj = { user: { address: { city: "Leeds" } } };
    const copy = deepClone(obj);
    copy.user.address.city = "York";
    expect(obj.user.address.city).toBe("Leeds");
  });

  it("copies arrays, keeping them as arrays", () => {
    const arr = [1, [2, 3], { a: [4] }];
    const copy = deepClone(arr);
    expect(copy).toEqual(arr);
    expect(Array.isArray(copy[1])).toBe(true);
    expect(copy[2].a).not.toBe(arr[2].a);
  });

  // JSON.parse(JSON.stringify(x)) would drop this. Yours shouldn't.
  it.todo("keeps keys whose value is undefined");

  it.todo("copies an array of objects so editing one copy leaves the original alone");
});
