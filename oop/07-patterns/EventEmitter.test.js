/**
 * EventEmitter
 *   on(event, fn) / once(event, fn) / off(event, fn) — return this
 *   emit(event, ...args) → true if any listener ran, else false.
 *     Listeners run in the order they were added.
 *   listenerCount(event) → number
 */
import { describe, it, expect, vi } from "vitest";
import { EventEmitter } from "./EventEmitter.js";

describe("EventEmitter", () => {
  it("calls listeners with the emitted arguments", () => {
    const e = new EventEmitter();
    const fn = vi.fn();
    e.on("data", fn);
    e.emit("data", 1, 2);
    expect(fn).toHaveBeenCalledWith(1, 2);
  });

  it("calls listeners in the order they were added", () => {
    const e = new EventEmitter();
    const order = [];
    e.on("x", () => order.push("a")).on("x", () => order.push("b"));
    e.emit("x");
    expect(order).toEqual(["a", "b"]);
  });

  it("returns whether any listener ran", () => {
    const e = new EventEmitter();
    expect(e.emit("nothing")).toBe(false);
    e.on("x", () => {});
    expect(e.emit("x")).toBe(true);
  });

  it("removes listeners with off", () => {
    const e = new EventEmitter();
    const fn = vi.fn();
    e.on("x", fn).off("x", fn);
    e.emit("x");
    expect(fn).not.toHaveBeenCalled();
  });

  it("runs once listeners only once", () => {
    const e = new EventEmitter();
    const fn = vi.fn();
    e.once("x", fn);
    e.emit("x");
    e.emit("x");
    expect(fn).toHaveBeenCalledTimes(1);
    expect(e.listenerCount("x")).toBe(0);
  });

  // Unsubscribing inside a listener shouldn't make the emitter skip the next listener.
  it("still calls every listener when one removes itself during emit", () => {
    const e = new EventEmitter();
    const second = vi.fn();
    const first = () => e.off("x", first);
    e.on("x", first).on("x", second);
    e.emit("x");
    expect(second).toHaveBeenCalled();
  });

  it.todo("removes a once listener with off using the original function");

  it.todo("keeps events separate");

  it.todo("counts listeners per event");
});
