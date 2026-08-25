"use client";

import Navbar from "@/app/(protected)/documents/[documentId]/Navbar";
import Editor from "./Editor";
import ToolBar from "./ToolBar";
import { Room } from "@/app/(protected)/documents/[documentId]/Room";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";

interface DocDetailsProps {
  preLoadedDocument: Preloaded<typeof api.documents.getById>;
}

function DocDetails({ preLoadedDocument }: DocDetailsProps) {
  const document = usePreloadedQuery(preLoadedDocument);
  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 gap-y-2 fixed top-0 left-0 right-0 bg-[#FAFBFD] print:hidden z-30">
          <Navbar data={document} />
          <ToolBar />
        </div>
        <div className="pt-28.5 print:pt-0">
          <Editor initialContent={document.initialContent} />
        </div>
      </div>
    </Room>
  );
}

export default DocDetails;
