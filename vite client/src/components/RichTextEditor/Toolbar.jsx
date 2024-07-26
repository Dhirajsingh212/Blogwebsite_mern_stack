import {
  Bold,
  Strikethrough,
  Italic,
  Code,
  Underline,
  Heading1,
  Heading2,
  Heading3,
} from "lucide-react";

const Toolbar = ({ editor, content }) => {
  if (!editor) {
    return null;
  }
  return (
    <div className="flex w-full flex-wrap items-start justify-between gap-5 rounded-tl-md rounded-tr-md  bg-slate-800 px-4 py-3 border-none ">
      <div className="flex w-full flex-wrap items-center justify-start gap-8 lg:w-10/12">
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleBold().run();
          }}
          className={
            editor.isActive("bold")
              ? "rounded-lg bg-sky-700 p-2 text-white"
              : "text-sky-400"
          }
        >
          <Bold className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleItalic().run();
          }}
          className={
            editor.isActive("italic")
              ? "rounded-lg bg-sky-700 p-2 text-white"
              : "text-sky-400"
          }
        >
          <Italic className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleUnderline().run();
          }}
          className={
            editor.isActive("underline")
              ? "rounded-lg bg-sky-700 p-2 text-white"
              : "text-sky-400"
          }
        >
          <Underline className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleStrike().run();
          }}
          className={
            editor.isActive("strike")
              ? "rounded-lg bg-sky-700 p-2 text-white"
              : "text-sky-400"
          }
        >
          <Strikethrough className="h-5 w-5" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleCode().run();
          }}
          className={
            editor.isActive("code")
              ? "rounded-lg bg-sky-700 p-2 text-white"
              : "text-sky-400"
          }
        >
          <Code className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 1 }).run();
          }}
          className={
            editor.isActive("heading", { level: 1 })
              ? "rounded-lg bg-sky-700 p-2 text-white"
              : "text-sky-400"
          }
        >
          <Heading1 className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }}
          className={
            editor.isActive("heading", { level: 2 })
              ? "rounded-lg bg-sky-700 p-2 text-white"
              : "text-sky-400"
          }
        >
          <Heading2 className="h-5 w-5" />
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }}
          className={
            editor.isActive("heading", { level: 3 })
              ? "rounded-lg bg-sky-700 p-2 text-white"
              : "text-sky-400"
          }
        >
          <Heading3 className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;
