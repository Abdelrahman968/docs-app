import { format } from "date-fns";

import { TableCell, TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";

import { SiGoogledocs } from "react-icons/si";
import { Building2Icon, CircleUserIcon, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentRowProps {
  document: Doc<"documents">;
}

const DocumentRow = ({ document }: DocumentRowProps) => {
  return (
    <TableRow>
      <TableCell className="w-12.5">
        <SiGoogledocs className="size-6 fill-blue-500" />
      </TableCell>
      <TableCell className="font-medium md:w-[45%]">{document.title}</TableCell>
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
        <Button variant={"ghost"} size="icon" className={"rounded-full"}>
          <MoreVertical className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default DocumentRow;
