"use client";
import DocumentInput from "@/app/documents/[documentId]/DocumentInput";
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

const Navbar = () => {
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
                    <MenubarSubContent>
                      <MenubarGroup>
                        <MenubarItem>
                          <FileJson className="size-4" />
                          JSON
                        </MenubarItem>
                        <MenubarItem>
                          <CodeXml className="size-4" />
                          HTML
                        </MenubarItem>
                        <MenubarItem>
                          <FaFilePdf className="size-4" />
                          PDF
                        </MenubarItem>
                        <MenubarItem>
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
                  <MenubarItem>
                    <Undo2Icon className="size-4" />
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
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
                      {[1, 2, 3, 4, 5, 6].map((size) => (
                        <MenubarItem key={size}>
                          <TableCellsMergeIcon className="size-4" />
                          {size} x {size}
                        </MenubarItem>
                      ))}
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
                      <MenubarItem>
                        <BoldIcon className="size-4" />
                        Bold <MenubarShortcut>⌘B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <ItalicIcon className="size-4" />
                        Italic <MenubarShortcut>⌘I </MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <UnderlineIcon className="size-4" />
                        UnderLine <MenubarShortcut>⌘U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem>
                        <StrikethroughIcon className="size-4" />
                        Strikethrough <MenubarShortcut>⌘S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
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
