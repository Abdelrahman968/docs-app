"use client";

import "./style.scss";

import {
  useLiveblocksExtension,
  FloatingToolbar,
} from "@liveblocks/react-tiptap";

import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TableKit } from "@tiptap/extension-table";
import ImageResize from "tiptap-extension-resize-image";

import { TextStyleKit } from "@tiptap/extension-text-style";

import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEditorStore } from "@/store/use-editor-store";
import { useEffect } from "react";

import Ruler from "@/app/(protected)/documents/[documentId]/Ruler";
import { Threads } from "@/app/(protected)/documents/[documentId]/Threads";
import { useStorage } from "@liveblocks/react/suspense";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margin";

interface EditorProps {
  initialContent?: string;
}

const createDocumentExtensions = () => [
  StarterKit.configure({
    undoRedo: false,
    link: {
      autolink: true,
      defaultProtocol: "https",
      openOnClick: false,
    },
  }),

  TaskList,

  TaskItem.configure({
    nested: true,
  }),

  ImageResize,

  TextStyleKit,

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),

  Highlight.configure({
    multicolor: true,
  }),

  TableKit.configure({
    table: {
      resizable: true,
    },
  }),
];

function Editor({ initialContent }: EditorProps) {
  const leftMargin = useStorage((root) => root.leftMargin);
  const rightMargin = useStorage((root) => root.rightMargin);

  const liveblocks = useLiveblocksExtension({
    collaborationMode: "yjs",
    field: "document",
    offlineSupport_experimental: true,
  });

  const { setEditor } = useEditorStore();

  const editor = useEditor({
    onCreate({ editor }) {
      setEditor(editor);
    },

    onDestroy() {
      setEditor(null);
    },

    onUpdate({ editor }) {
      setEditor(editor);
    },

    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },

    onTransaction({ editor }) {
      setEditor(editor);
    },

    onFocus({ editor }) {
      setEditor(editor);
    },

    onBlur({ editor }) {
      setEditor(editor);
    },

    onContentError({ editor }) {
      setEditor(editor);
    },

    editorProps: {
      attributes: {
        style: `
          padding-left:${leftMargin ?? LEFT_MARGIN_DEFAULT}px;
          padding-right:${rightMargin ?? RIGHT_MARGIN_DEFAULT}px;
        `,

        class:
          "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text",
      },
    },

    extensions: [liveblocks, ...createDocumentExtensions()],

    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor || !initialContent) return;

    const storage = editor.storage.liveblocksExtension;
    if (!("provider" in storage)) return;

    const provider = storage.provider;
    const ydoc = provider.getYDoc();
    const contentConfig = ydoc.getMap("liveblocks_config");

    const seedContent = () => {
      if (contentConfig.get("hasContentSet")) return;

      contentConfig.set("hasContentSet", true);
      editor.commands.setContent(initialContent);
    };

    const handleProviderStatus = (status: string) => {
      if (status === "synchronized") seedContent();
    };

    provider.on("status", handleProviderStatus);

    if (provider.getStatus() === "synchronized") seedContent();

    return () => provider.off("status", handleProviderStatus);
  }, [editor, initialContent]);

  console.log("EDITOR INSTANCE:", editor);

  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] px-4 print:bg-white print:p-0 print:overflow-visible">
      <Ruler />

      <div className="min-w-max flex justify-center w-204 py-4 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />

        <Threads editor={editor} />

        <FloatingToolbar editor={editor} />
      </div>
    </div>
  );
}

export default Editor;
