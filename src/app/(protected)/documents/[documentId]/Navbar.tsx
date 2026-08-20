"use client";
import Image from "next/image";
import Link from "next/link";

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
  ItalicIcon,
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
} from "lucide-react";
import { FaFilePdf } from "react-icons/fa6";
import { useEditorStore } from "@/store/use-editor-store";
import { Field, FieldGroup } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import DocumentInput from "@/app/(protected)/documents/[documentId]/DocumentInput";

const Navbar = () => {
  const { editor } = useEditorStore();
  const [withHeader, setWithHeader] = useState<boolean>(false);

  const onDownload = (blob: Blob, fileName: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;

    const content = editor.getJSON();

    const blob = new Blob([JSON.stringify(content)], {
      type: "application/json",
    });

    onDownload(blob, "document.json"); // TODO: use doc name
  };

  const onSaveHTML = () => {
    if (!editor) return;

    const content = editor.getHTML();

    const blob = new Blob([content], {
      type: "text/html",
    });

    onDownload(blob, "document.html"); // TODO: use doc name
  };

  const onSaveText = () => {
    if (!editor) return;

    const content = editor.getText();

    const blob = new Blob([content], {
      type: "text/plain",
    });

    onDownload(blob, "document.txt"); // TODO: use doc name
  };

  return (
    <nav className="flex item-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent className={"print:hidden"}>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <Save className="size-4" /> Save As{" "}
                    </MenubarSubTrigger>
                    <MenubarSubContent className={"print:hidden"}>
                      <MenubarGroup>
                        <MenubarItem onClick={onSaveJSON}>
                          <FileJson className="size-4" />
                          JSON
                        </MenubarItem>
                        <MenubarItem onClick={onSaveHTML}>
                          <CodeXml className="size-4" />
                          HTML
                        </MenubarItem>
                        <MenubarItem
                          onClick={() => {
                            window.print();
                          }}
                        >
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
                    <MenubarItem>
                      <Trash2Icon className="size-4" />
                      Remove
                    </MenubarItem>
                  </MenubarGroup>
                  <MenubarSeparator />
                  <MenubarItem
                    onClick={() => {
                      window.print();
                    }}
                  >
                    <PrinterIcon className="size-4" />
                    Print <MenubarShortcut>⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger>Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem
                    onClick={() => {
                      editor?.chain().focus().undo().run();
                    }}
                  >
                    <Undo2Icon className="size-4" />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => {
                      editor?.chain().focus().redo().run();
                    }}
                  >
                    <Redo2Icon className="size-4" />
                    Redo <MenubarShortcut>⌘Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Insert</MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TableIcon className="size-4" />
                      Table
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem>
                        <FieldGroup
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <Field orientation="horizontal">
                            <Checkbox
                              checked={withHeader}
                              onCheckedChange={setWithHeader}
                              id="table-header-checkbox"
                              className="hover:[&>span>svg]:text-white"
                            />
                            <Label htmlFor="table-header-checkbox">
                              With Header
                            </Label>
                          </Field>
                        </FieldGroup>
                      </MenubarItem>
                      {[1, 2, 3, 4, 5, 6].map((size) => {
                        const sizeNum = Number(size);
                        return (
                          <MenubarItem
                            key={size}
                            onClick={() => {
                              editor
                                ?.chain()
                                .focus()
                                .insertTable({
                                  rows: sizeNum,
                                  cols: sizeNum,
                                  withHeaderRow: withHeader,
                                })
                                .run();
                            }}
                          >
                            <TableCellsMergeIcon className="size-4" />
                            {size} × {size}
                          </MenubarItem>
                        );
                      })}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>Format</MenubarTrigger>
                <MenubarContent className={"w-fit"}>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem
                        onClick={() => {
                          editor?.chain().focus().toggleBold().run();
                        }}
                      >
                        <BoldIcon className="size-4" />
                        Bold <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          editor?.chain().focus().toggleItalic().run();
                        }}
                      >
                        <ItalicIcon className="size-4" />
                        Italic <MenubarShortcut>⌘I </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          editor?.chain().focus().toggleUnderline().run();
                        }}
                      >
                        <UnderlineIcon className="size-4" />
                        UnderLine <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem
                        onClick={() => {
                          editor?.chain().focus().toggleStrike().run();
                        }}
                      >
                        <StrikethroughIcon className="size-4" />
                        Strikethrough <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem
                    onClick={() => {
                      editor?.chain().focus().unsetAllMarks().run();
                    }}
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
    </nav>
  );
};

export default Navbar;
