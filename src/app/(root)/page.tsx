"use client";

import Navbar from "@/app/(root)/Navbar";
import TemplateGallery from "@/app/(root)/TemplateGallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import DocumentsTable from "@/app/(root)/DocumentsTable";

function HomePage() {
  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.documents.getDocuments,
    {},
    { initialNumItems: 5 },
  );

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default HomePage;
