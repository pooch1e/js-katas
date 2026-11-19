/**
 * MyPromise — new MyPromise((resolve, reject) => ...), .then, .catch,
 * MyPromise.resolve, MyPromise.reject. Must be awaitable (anything with a
 * working .then is). Don't use the native Promise inside it.
 */
import { describe, it, expect } from "vitest";
import { MyPromise } from "./MyPromise.js";

class OopsError extends Error {}

const settle = (p) =>
  new Promise((done) => p.then((value) => done({ value }), (reason) => done({ reason })));

describe("MyPromise", () => {
  describe("executor", () => {
    it("runs the executor synchronously", () => {
      let ran = false;
      new MyPromise(() => (ran = true));
      expect(ran).toBe(true);
    });

    it("rejects if the executor throws", async () => {
      const r = await settle(new MyPromise(() => { throw new OopsError("x"); }));
      expect(r.reason).toBeInstanceOf(OopsError);
    });
  });

  describe("then", () => {
    it("receives an already-resolved value", async () => {
      expect(await settle(new MyPromise((res) => res(42)))).toEqual({ value: 42 });
    });

    it("receives a value resolved later", async () => {
      const p = new MyPromise((res) => setTimeout(() => res("later"), 5));
      expect(await settle(p)).toEqual({ value: "later" });
    });

    it("always calls callbacks asynchronously", () => {
      const order = [];
      new MyPromise((res) => res()).then(() => order.push("callback"));
      order.push("sync");
      expect(order).toEqual(["sync"]);
    });

    it("ignores resolve/reject after the first settle", async () => {
      const p = new MyPromise((res, rej) => {
        res("first");
        res("second");
        rej(new OopsError("too late"));
      });
      expect(await settle(p)).toEqual({ value: "first" });
    });

    it("supports several then calls on one promise", async () => {
      const p = new MyPromise((res) => setTimeout(() => res(1), 1));
      const [a, b] = await Promise.all([settle(p.then((v) => v + 1)), settle(p.then((v) => v + 2))]);
      expect([a.value, b.value]).toEqual([2, 3]);
    });
  });

  describe("chaining", () => {
    it("passes return values down the chain", async () => {
      const p = new MyPromise((res) => res(1)).then((v) => v + 1).then((v) => v * 10);
      expect(await settle(p)).toEqual({ value: 20 });
    });

    it("turns a throw in a callback into a rejection", async () => {
      const p = new MyPromise((res) => res()).then(() => { throw new OopsError("in then"); });
      expect((await settle(p)).reason).toBeInstanceOf(OopsError);
    });

    it("skips fulfilment handlers until a catch", async () => {
      const p = MyPromise.reject(new OopsError("x"))
        .then(() => "skipped")
        .catch((e) => `caught ${e.message}`);
      expect(await settle(p)).toEqual({ value: "caught x" });
    });

    it("waits for a returned thenable (adoption)", async () => {
      const p = MyPromise.resolve(1).then((v) => new MyPromise((res) => setTimeout(() => res(v + 100), 5)));
      expect(await settle(p)).toEqual({ value: 101 });
    });

    it("can be awaited", async () => {
      expect(await MyPromise.resolve("awaited")).toBe("awaited");
    });
  });

  it.todo("passes values through when then is called with no callbacks");

  it.todo("adopts a native Promise returned from then");

  // Stretch: static all(values) built on your own MyPromise.
  it.todo("MyPromise.all resolves with results in order");
});
