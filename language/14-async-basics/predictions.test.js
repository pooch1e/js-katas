/**
 * predictions — runs each snippet for real and compares its log with your
 * prediction in predictions.js.
 */
import { describe, it, expect } from "vitest";
import * as snippets from "./snippets.js";
import * as predictions from "./predictions.js";

async function run(snippet) {
  const logged = [];
  snippet((label) => logged.push(label));
  await new Promise((resolve) => setTimeout(resolve, 20));
  return logged;
}

describe("event loop predictions", () => {
  it("snippet A: sync, timeout, promise", async () => {
    expect(predictions.orderA).toEqual(await run(snippets.snippetA));
  });

  it("snippet B: code after await", async () => {
    expect(predictions.orderB).toEqual(await run(snippets.snippetB));
  });

  it("snippet C: timeouts and microtasks interleaved", async () => {
    expect(predictions.orderC).toEqual(await run(snippets.snippetC));
  });

  it("snippet D: then chains vs queueMicrotask", async () => {
    expect(predictions.orderD).toEqual(await run(snippets.snippetD));
  });

  it("snippet E: the Promise executor", async () => {
    expect(predictions.orderE).toEqual(await run(snippets.snippetE));
  });
});
