/**
 * TextEditor, InsertCommand, DeleteCommand — the command pattern with undo/redo.
 * See README.md › TextEditor.
 */
export class TextEditor {
  constructor() {
    throw new Error("TODO: implement TextEditor");
  }

  execute(command) {}

  undo() {}

  redo() {}

  get canUndo() {}

  get canRedo() {}
}

export class InsertCommand {
  constructor(position, text) {}

  execute(editor) {}

  undo(editor) {}
}

export class DeleteCommand {
  constructor(position, length) {}

  execute(editor) {}

  undo(editor) {}
}
