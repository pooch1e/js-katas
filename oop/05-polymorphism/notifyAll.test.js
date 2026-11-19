/**
 * notifyAll(channels, message) — for each channel:
 *   - no send() method       → { channel: name, status: "skipped" }
 *   - send() resolves/returns → { channel: name, status: "sent" }
 *   - send() throws/rejects  → { channel: name, status: "failed", error: err.message }
 * name is channel.name if present, otherwise channel.constructor.name.
 * Every channel is attempted even if earlier ones fail. Results are in channel order.
 */
import { describe, it, expect, vi } from "vitest";
import { notifyAll } from "./notifyAll.js";

class EmailChannel {
  constructor() {
    this.sent = [];
  }
  async send(msg) {
    this.sent.push(msg);
  }
}

class SmsChannel {
  send() {
    throw new Error("no signal");
  }
}

describe("notifyAll", () => {
  it("sends through a working channel", async () => {
    const email = new EmailChannel();
    expect(await notifyAll([email], "hi")).toEqual([{ channel: "EmailChannel", status: "sent" }]);
    expect(email.sent).toEqual(["hi"]);
  });

  it("reports failures without stopping", async () => {
    const email = new EmailChannel();
    const results = await notifyAll([new SmsChannel(), email], "hi");
    expect(results).toEqual([
      { channel: "SmsChannel", status: "failed", error: "no signal" },
      { channel: "EmailChannel", status: "sent" },
    ]);
  });

  it("accepts any object with send()", async () => {
    const slack = { name: "slack", send: vi.fn() };
    await notifyAll([slack], "deploy done");
    expect(slack.send).toHaveBeenCalledWith("deploy done");
  });

  it.todo("skips objects without a send method");

  it.todo("reports async rejections as failures");
});
