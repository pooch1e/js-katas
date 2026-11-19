/**
 * TextEditor — has a public `text` string (starts "").
 *   execute(cmd) runs cmd.execute(editor), records it, clears redo history; returns this
 *   undo() / redo() — no-ops when there's nothing to undo/redo; return this
 *   canUndo / canRedo — getters
 * InsertCommand(position, text); DeleteCommand(position, length) — each with
 *   execute(editor) and undo(editor). DeleteCommand must remember what it deleted.
 */
import { describe, it, expect } from "vitest";
import { TextEditor, InsertCommand, DeleteCommand } from "./TextEditor.js";

describe("TextEditor", () => {
  it("inserts text", () => {
    const ed = new TextEditor();
    ed.execute(new InsertCommand(0, "hello")).execute(new InsertCommand(5, " world"));
    expect(ed.text).toBe("hello world");
  });

  it("deletes text", () => {
    const ed = new TextEditor().execute(new InsertCommand(0, "hello world"));
    ed.execute(new DeleteCommand(5, 6));
    expect(ed.text).toBe("hello");
  });

  it("undoes in reverse order", () => {
    const ed = new TextEditor();
    ed.execute(new InsertCommand(0, "ab")).execute(new InsertCommand(2, "cd"));
    ed.undo();
    expect(ed.text).toBe("ab");
    ed.undo();
    expect(ed.text).toBe("");
  });

  // Undo has to put back exactly what was deleted. Where does that text come from?
  it("undoes a delete", () => {
    const ed = new TextEditor().execute(new InsertCommand(0, "hello world"));
    ed.execute(new DeleteCommand(0, 6));
    ed.undo();
    expect(ed.text).toBe("hello world");
  });

  it("redoes what was undone", () => {
    const ed = new TextEditor().execute(new InsertCommand(0, "hi"));
    ed.undo().redo();
    expect(ed.text).toBe("hi");
  });

  it("clears redo history after a new edit", () => {
    const ed = new TextEditor().execute(new InsertCommand(0, "a"));
    ed.undo();
    ed.execute(new InsertCommand(0, "b"));
    expect(ed.canRedo).toBe(false);
  });

  it.todo("treats undo/redo with empty history as no-ops");

  it.todo("reports canUndo correctly through a sequence of edits and undos");
});
