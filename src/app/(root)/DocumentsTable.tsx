import { PaginationStatus } from "convex/browser";
import { Doc } from "../../../convex/_generated/dataModel";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DocumentRow from "@/app/(root)/DocumentRow";
import { Button } from "@/components/ui/button";

interface DocumentsTableProps {
  documents: Doc<"documents">[] | undefined;
  loadMore: (numItems: number) => void;
  status: PaginationStatus;
  isLoading: boolean;
}

const DocumentsTable = ({
  documents,
  isLoading,
  status,
  loadMore,
}: DocumentsTableProps) => {
  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <div className="size-6 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-16 py-6 flex flex-col gap-5">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>&nbsp;</TableHead>
            <TableHead className="hidden md:table-cell">Shared</TableHead>
            <TableHead className="hidden md:table-cell">Created At</TableHead>
          </TableRow>
        </TableHeader>
        {documents?.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-muted-foreground h-24 text-center"
              >
                No documents found
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {documents?.map((doc) => {
              return <DocumentRow key={doc._id} document={doc} />;
            })}
          </TableBody>
        )}
      </Table>
      {status === "CanLoadMore" && (
        <div className="flex items-center justify-center">
          <Button variant="default" size="sm" onClick={() => loadMore(5)}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentsTable;
