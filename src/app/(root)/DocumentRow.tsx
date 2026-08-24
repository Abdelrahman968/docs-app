import { format } from "date-fns";

import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";

import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon } from "lucide-react";
import DocumentMenu from "@/app/(root)/DocumentMenu";
import Link from "next/link";

interface DocumentRowProps {
  document: Doc<"documents">;
}

const DocumentRow = ({ document }: DocumentRowProps) => {
  const onNewTapClick = (id: string) => {
    window.open(`/documents/${id}`, "_blank");
  };

  return (
    <TableRow>
      <TableCell className="w-12.5">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">
        <Link href={`/documents/${document._id}`}>
          <span className="hover:font-bold transition-all duration-300 ease-in-out">
            {document.title}
          </span>
        </Link>
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
        {document.organizationID ? (
          <Building2Icon className="size-4" />
        ) : (
          <CircleUserIcon className="size-4" />
        )}
        {document.organizationID ? "Organization" : "Personal"}
      </TableCell>
      <TableCell className="text-muted-foreground hidden md:table-cell">
        {format(new Date(document._creationTime), "MMM dd, yyyy")}
      </TableCell>
      <TableCell className="flex justify-end">
        <DocumentMenu
          documentId={document._id}
          title={document.title}
          onNewTapClick={onNewTapClick}
        />
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
