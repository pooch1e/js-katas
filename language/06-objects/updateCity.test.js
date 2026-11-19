/**
 * updateCity(user, city) — immutable update of user.address.city.
 */
import { describe, it, expect } from "vitest";
import { updateCity } from "./updateCity.js";

const makeUser = () => ({
  name: "Ada",
  address: { street: "1 Main St", city: "Leeds" },
  prefs: { theme: "dark" },
});

describe("updateCity", () => {
  it("returns a user with the new city", () => {
    expect(updateCity(makeUser(), "York").address.city).toBe("York");
  });

  it("keeps the other address fields", () => {
    expect(updateCity(makeUser(), "York").address.street).toBe("1 Main St");
  });

  // { ...user } alone fails this. The address object is still shared.
  it("does not change the original user's city", () => {
    const user = makeUser();
    updateCity(user, "York");
    expect(user.address.city).toBe("Leeds");
  });

  it("creates new user and address objects", () => {
    const user = makeUser();
    const next = updateCity(user, "York");
    expect(next).not.toBe(user);
    expect(next.address).not.toBe(user.address);
  });

  // Untouched branches can be shared. That's cheap and is how React state works.
  it.todo("reuses the same prefs object (toBe) since prefs didn't change");
});
