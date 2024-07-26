import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./Toolbar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Code from "@tiptap/extension-code";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import { useEffect, useState } from "react";

const RichTextEditor = ({ text, setText }) => {
  useEffect(() => {
    editor.commands.setContent(text);
  }, [text]);
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      StarterKit,
      Underline,
      Code,
      Placeholder.configure({
        placeholder: "Description",
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose max-w-none bg-black text-white placeholder:text-white h-96 p-4 text-[16px] border-b border-l border-r border-gray-900 overflow-y-scroll no-scrollbar font-sans outline-none  rounded-bl-md rounded-br-md ",
      },
    },
    onUpdate: ({ editor }) => {
      setText(editor.getHTML());
    },
  });

  return (
    <div>
      <Toolbar editor={editor} content={text} />
      <EditorContent style={{ whiteSpace: "pre-line" }} editor={editor} />
    </div>
  );
};

export default RichTextEditor;
