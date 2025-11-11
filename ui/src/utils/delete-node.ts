import type { Editor } from "@tiptap/core";

export function deleteNode(name: string, editor: Editor) {
  const { state, view } = editor;
  const { selection } = state as typeof state & {
    selection: { from: number; to: number; node?: { type?: { name?: string } }; [key: string]: unknown };
  };

  if (selection?.node?.type?.name === name) {
    const tr = state.tr.delete(selection.from, selection.to);
    view.dispatch(tr);
    view.focus();
    return true;
  }

  const deleted = editor.commands.deleteNode(name);
  if (deleted) {
    editor.commands.focus();
  }
  return deleted;
}
