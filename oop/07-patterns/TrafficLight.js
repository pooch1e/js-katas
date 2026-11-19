/**
 * TrafficLight / InvalidTransitionError — the state pattern.
 * See README.md › TrafficLight.
 */
export class InvalidTransitionError extends Error {}

export class TrafficLight {
  constructor() {
    throw new Error("TODO: implement TrafficLight");
  }

  get state() {}

  get canGo() {}

  next() {}

  emergency() {}

  reset() {}
}
