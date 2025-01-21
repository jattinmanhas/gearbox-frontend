"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { HardBreak } from "@tiptap/extension-hard-break";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  content,
  onChange,
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false,
      }),
      HardBreak.configure({
        keepMarks: true,
      }),
    ],
    editorProps : {
        attributes: {
            class: "prose prose-sm focus:outline-none focus:outline-green-600 border rounded bg-neutral-800 text-white text-lg p-2"
        }
    },
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-neutral-700 text-white rounded-lg p-4 shadow-sm">
      {/* Toolbar */}
      <div className="flex gap-2 mb-2">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`px-2 py-1 text-sm font-medium border rounded ${
            editor.isActive("bold") ? "bg-green-500 text-white" : "bg-gray-700"
          }`}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`px-2 py-1 text-sm font-medium border rounded ${
            editor.isActive("italic")
              ? "bg-green-500 text-white"
              : "bg-gray-700"
          }`}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`px-2 py-1 text-sm font-medium border rounded ${
            editor.isActive("strike")
              ? "bg-green-500 text-white"
              : "bg-gray-700"
          }`}
        >
          Strike
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`px-2 py-1 text-sm font-medium border rounded ${
            editor.isActive("paragraph")
              ? "bg-green-500 text-white"
              : "bg-gray-700"
          }`}
        >
          Paragraph
        </button>
      </div>

      {/* Editor Content */}
      <EditorContent
        editor={editor}
      />
    </div>
  );
};
