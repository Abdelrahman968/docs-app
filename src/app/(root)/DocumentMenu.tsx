"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ExternalLinkIcon,
  FilePenIcon,
  MoreVertical,
  TrashIcon,
} from "lucide-react";

import { Id } from "../../../convex/_generated/dataModel";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import RemoveDialog from "@/components/RemoveDialog";
import RenameDialog from "@/components/RenameDialog";

interface DocumentMenuProps {
  documentId: Id<"documents">;
  title: string;
  onNewTapClick: (id: Id<"documents">) => void;
}

const DocumentMenu = ({
  documentId,
  title,
  onNewTapClick,
}: DocumentMenuProps) => {
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="size-4" />
            </Button>
          }
        />

        <DropdownMenuContent className="w-fit">
          <DropdownMenuItem
            onClick={() => {
              onNewTapClick(documentId);
            }}
          >
            <ExternalLinkIcon className="size-4" />
            Open on New Tab
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setIsRenameOpen(true);
            }}
          >
            <FilePenIcon className="size-4" />
            Rename
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setIsRemoveOpen(true);
            }}
          >
            <TrashIcon className="size-4" />
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <RemoveDialog
        documentId={documentId}
        open={isRemoveOpen}
        onOpenChange={setIsRemoveOpen}
      />
      <RenameDialog
        documentId={documentId}
        open={isRenameOpen}
        onOpenChange={setIsRenameOpen}
        title={title}
      />
    </>
  );
};

export default DocumentMenu;
