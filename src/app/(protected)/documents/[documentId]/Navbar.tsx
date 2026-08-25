"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Menubar,
  MenubarSub,
  MenubarContent,
  MenubarSubContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
  MenubarSubTrigger,
} from "@/components/ui/menubar";

import {
  BoldIcon,
  CodeXml,
  FileJson,
  FilePlusIcon,
  FileTextIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  Save,
  SavePen,
  StrikethroughIcon,
  TableCellsMergeIcon,
  TableIcon,
  TextIcon,
  Trash2Icon,
  UnderlineIcon,
  Undo2Icon,
  ItalicIcon,
} from "lucide-react";

import { FaFilePdf } from "react-icons/fa6";

import { useEditorStore } from "@/store/use-editor-store";

import { Field, FieldGroup } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import DocumentInput from "@/app/(protected)/documents/[documentId]/DocumentInput";

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";

import Avatars from "@/app/(protected)/documents/[documentId]/Avatars";
import Inbox from "@/app/(protected)/documents/[documentId]/Inbox";

const Navbar = () => {
  const { editor } = useEditorStore();

  const [withHeader, setWithHeader] = useState(false);

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();

    const blob = new Blob([JSON.stringify(content, null, 2)], {
      type: "application/json",
    });

    onDownload(blob, "document.json");
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();

    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, "document.html");
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();

    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, "document.txt");
  };

  return (
    <nav className="flex items-center justify-between border-b px-6 py-1.5">
      <div className="flex min-w-0 items-center gap-2">
        <Link
          href="/"
          className="flex shrink-0 items-center justify-center rounded-lg p-1 transition-colors hover:bg-muted"
        >
          <Image src="/logo.svg" alt="logo" width={36} height={36} priority />
        </Link>

        <div className="flex min-w-0 flex-col">
          <div className="max-w-75">
            <DocumentInput />
          </div>

          <div className="flex">
            <Menubar className="h-auto border-0 bg-transparent p-0 shadow-none">
              <MenubarMenu>
                <MenubarTrigger className="h-7 rounded-md px-2 text-xs hover:bg-muted">
                  File
                </MenubarTrigger>

                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Save className="size-4" />
                      Save As
                    </MenubarSubTrigger>

                    <MenubarSubContent className="print:hidden">
                      <MenubarGroup>
                        <MenubarItem onClick={onSaveJSON}>
                          <FileJson className="size-4" />
                          JSON
                        </MenubarItem>

                        <MenubarItem onClick={onSaveHTML}>
                          <CodeXml className="size-4" />
                          HTML
                        </MenubarItem>

                        <MenubarItem onClick={() => window.print()}>
                          <FaFilePdf className="size-4" />
                          PDF
                        </MenubarItem>

                        <MenubarItem onClick={onSaveText}>
                          <FileTextIcon className="size-4" />
                          Text
                        </MenubarItem>
                      </MenubarGroup>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem>
                    <FilePlusIcon className="size-4" />
                    New Document
                  </MenubarItem>

                  <MenubarSeparator />

                  <MenubarGroup>
                    <MenubarItem>
                      <SavePen className="size-4" />
                      Rename
                    </MenubarItem>

                    <MenubarItem className="text-destructive focus:text-destructive">
                      <Trash2Icon className="size-4" />
                      Remove
                    </MenubarItem>
                  </MenubarGroup>

                  <MenubarSeparator />

                  <MenubarItem onClick={() => window.print()}>
                    <PrinterIcon className="size-4" />
                    Print
                    <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="h-7 rounded-md px-2 text-xs hover:bg-muted">
                  Edit
                </MenubarTrigger>

                <MenubarContent>
                  <MenubarItem
                    onClick={() => editor?.chain().focus().undo().run()}
                  >
                    <Undo2Icon className="size-4" />
                    Undo
                    <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>

                  <MenubarItem
                    onClick={() => editor?.chain().focus().redo().run()}
                  >
                    <Redo2Icon className="size-4" />
                    Redo
                    <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="h-7 rounded-md px-2 text-xs hover:bg-muted">
                  Insert
                </MenubarTrigger>

                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TableIcon className="size-4" />
                      Table
                    </MenubarSubTrigger>

                    <MenubarSubContent>
                      <MenubarItem onSelect={(e) => e.preventDefault()}>
                        <FieldGroup onClick={(e) => e.stopPropagation()}>
                          <Field orientation="horizontal">
                            <Checkbox
                              checked={withHeader}
                              onCheckedChange={(value) =>
                                setWithHeader(Boolean(value))
                              }
                              id="table-header-checkbox"
                            />

                            <Label
                              htmlFor="table-header-checkbox"
                              className="cursor-pointer"
                            >
                              With Header
                            </Label>
                          </Field>
                        </FieldGroup>
                      </MenubarItem>

                      <MenubarSeparator />

                      {[1, 2, 3, 4, 5, 6].map((size) => (
                        <MenubarItem
                          key={size}
                          onClick={() => {
                            editor
                              ?.chain()
                              .focus()
                              .insertTable({
                                rows: size,
                                cols: size,
                                withHeaderRow: withHeader,
                              })
                              .run();
                          }}
                        >
                          <TableCellsMergeIcon className="size-4" />
                          {size} × {size}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="h-7 rounded-md px-2 text-xs hover:bg-muted">
                  Format
                </MenubarTrigger>

                <MenubarContent className="w-fit">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4" />
                      Text
                    </MenubarSubTrigger>

                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleBold().run()
                        }
                      >
                        <BoldIcon className="size-4" />
                        Bold
                        <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>

                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleItalic().run()
                        }
                      >
                        <ItalicIcon className="size-4" />
                        Italic
                        <MenubarShortcut>⌘I</MenubarShortcut>
                      </MenubarItem>

                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleUnderline().run()
                        }
                      >
                        <UnderlineIcon className="size-4" />
                        Underline
                        <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>

                      <MenubarItem
                        onClick={() =>
                          editor?.chain().focus().toggleStrike().run()
                        }
                      >
                        <StrikethroughIcon className="size-4" />
                        Strikethrough
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>

                  <MenubarItem
                    onClick={() =>
                      editor?.chain().focus().unsetAllMarks().run()
                    }
                  >
                    <RemoveFormattingIcon className="size-4" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <div className="flex items-center">
          <Avatars />
        </div>

        <div className="flex items-center">
          <Inbox />
        </div>

        <div className="flex items-center rounded-md border px-1 py-0.5">
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/"
            afterLeaveOrganizationUrl="/"
            afterSelectOrganizationUrl="/"
            afterSelectPersonalUrl="/"
          />
        </div>

        <div className="flex items-center">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
