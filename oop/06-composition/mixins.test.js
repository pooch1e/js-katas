/**
 * withTimestamps(Base, now = Date.now) — instances get createdAt and
 *   updatedAt (both now() at construction) and touch() (updatedAt = now(), returns this).
 * withSerializable(Base) — instances get serialize() → JSON string of own
 *   enumerable properties, and a static deserialize(json) on the class
 *   returning a new instance with those properties assigned.
 * Both must work on any base class and preserve its constructor arguments.
 */
import { describe, it, expect } from "vitest";
import { withTimestamps, withSerializable } from "./mixins.js";

class Note {
  constructor(text = "") {
    this.text = text;
  }
  shout() {
    return this.text.toUpperCase();
  }
}

const fakeClock = (...times) => {
  let i = 0;
  return () => times[Math.min(i++, times.length - 1)];
};

describe("withTimestamps", () => {
  it("adds createdAt and updatedAt", () => {
    const TimedNote = withTimestamps(Note, fakeClock(1000));
    const n = new TimedNote("hi");
    expect(n.createdAt).toBe(1000);
    expect(n.updatedAt).toBe(1000);
  });

  it("keeps the base class's constructor and methods", () => {
    const TimedNote = withTimestamps(Note, fakeClock(1));
    const n = new TimedNote("hi");
    expect(n.text).toBe("hi");
    expect(n.shout()).toBe("HI");
    expect(n).toBeInstanceOf(Note);
  });

  it("updates updatedAt on touch", () => {
    const TimedNote = withTimestamps(Note, fakeClock(1000, 5000));
    const n = new TimedNote("hi");
    n.touch();
    expect(n.updatedAt).toBe(5000);
    expect(n.createdAt).toBe(1000);
  });

  it.todo("returns this from touch() for chaining");
});

describe("withSerializable", () => {
  it("serializes own properties", () => {
    const SNote = withSerializable(Note);
    expect(JSON.parse(new SNote("hi").serialize())).toEqual({ text: "hi" });
  });

  it("deserializes into a real instance", () => {
    const SNote = withSerializable(Note);
    const n = SNote.deserialize('{"text":"back"}');
    expect(n).toBeInstanceOf(SNote);
    expect(n.shout()).toBe("BACK");
  });

  it("stacks with withTimestamps", () => {
    const Both = withSerializable(withTimestamps(Note, fakeClock(42)));
    expect(JSON.parse(new Both("x").serialize())).toEqual({ text: "x", createdAt: 42, updatedAt: 42 });
  });

  it.todo("works when stacked in the other order too");
});
