/**
 * Thermostat — keeps min <= target <= max true at all times.
 * See README.md › Thermostat.
 */
export class Thermostat {
  constructor({ min = 10, max = 30, target = 20 } = {}) {
    throw new Error("TODO: implement Thermostat");
  }

  get target() {}

  set target(value) {}

  get min() {}

  get max() {}

  setRange(min, max) {}
}
