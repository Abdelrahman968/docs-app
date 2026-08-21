"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "@/components/ui/toast";

interface RemoveDialogProps {
  documentId: Id<"documents">;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RemoveDialog = ({
  documentId,
  open,
  onOpenChange,
}: RemoveDialogProps) => {
  const remove = useMutation(api.documents.removeById);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            document and all of its data.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={async (e) => {
              e.stopPropagation();

              setIsDeleting(true);

              try {
                await remove({ id: documentId });

                toast.add({
                  type: "success",
                  description: "Document deleted successfully",
                });
              } catch (error) {
                toast.add({
                  type: "error",
                  description:
                    "You don't have permission to delete this document",
                });
              } finally {
                setIsDeleting(false);
              }
            }}
            disabled={isDeleting}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDialog;
