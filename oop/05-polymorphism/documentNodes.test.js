/**
 * Every node has render() → HTML string and plainText() → text only.
 *   new Text("a < b")                     → "a &lt; b"   (escape & < > in Text)
 *   new Bold(...children)                 → "<strong>…</strong>"
 *   new Link(href, ...children)           → '<a href="…">…</a>'
 *   new Paragraph(...children)            → "<p>…</p>"
 * Children are any nodes, including ones not defined in this file.
 */
import { describe, it, expect } from "vitest";
import { Text, Bold, Link, Paragraph } from "./documentNodes.js";

describe("document nodes", () => {
  it("renders text", () => {
    expect(new Text("hello").render()).toBe("hello");
  });

  it("escapes HTML in text", () => {
    expect(new Text("a < b & c > d").render()).toBe("a &lt; b &amp; c &gt; d");
  });

  it("renders nested nodes", () => {
    const doc = new Paragraph(new Text("Hello "), new Bold(new Text("world")), new Text("!"));
    expect(doc.render()).toBe("<p>Hello <strong>world</strong>!</p>");
  });

  it("renders links", () => {
    expect(new Link("/docs", new Text("docs")).render()).toBe('<a href="/docs">docs</a>');
  });

  it("extracts plain text from any depth", () => {
    const doc = new Paragraph(new Text("Read "), new Link("/x", new Bold(new Text("this"))));
    expect(doc.plainText()).toBe("Read this");
  });

  // The open/closed principle: new node types work without editing existing classes.
  it("renders a node type it has never seen", () => {
    const italic = { render: () => "<em>hi</em>", plainText: () => "hi" };
    expect(new Paragraph(italic).render()).toBe("<p><em>hi</em></p>");
  });

  it.todo("renders an empty paragraph as <p></p>");

  it.todo("does not escape text inside plainText()");
});
