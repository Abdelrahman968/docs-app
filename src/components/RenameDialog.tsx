"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "@/components/ui/toast";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface RenameDialogProps {
  documentId: Id<"documents">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

const RenameDialog = ({
  documentId,
  open,
  onOpenChange,
  title,
}: RenameDialogProps) => {
  const rename = useMutation(api.documents.updateById);
  const [isRename, setIsRename] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
          <DialogDescription>
            Enter a new title for the document.
          </DialogDescription>
        </DialogHeader>
        <Field>
          <Input
            id="new"
            name="name"
            defaultValue={title}
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </Field>
        <DialogFooter>
          <DialogClose
            render={
              <Button
                variant="outline"
                type="button"
                disabled={isRename}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Cancel
              </Button>
            }
          />
          <Button
            disabled={isRename}
            onClick={(e) => {
              e.stopPropagation();
              setIsRename(true);
              onOpenChange(false);

              rename({
                id: documentId,
                title: newTitle.trim() || "Untitled",
              }).finally(() => {
                setIsRename(false);
                toast.add({
                  type: "success",
                  description: "Document renamed successfully",
                });
              });
            }}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDialog;
