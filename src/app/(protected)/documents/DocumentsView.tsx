"use client";

import { usePaginatedQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import DocumentsTable from "@/app/(root)/DocumentsTable";
import TemplateGallery from "@/app/(root)/TemplateGallery";

export default function DocumentsView() {
  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.documents.getDocuments,
    {},
    { initialNumItems: 10 },
  );

  return (
    <main className="mx-auto w-full max-w-[1600px]">
      <section
        aria-labelledby="new-document-heading"
        className="px-4 pt-8 sm:px-6 lg:px-8"
      >
        <h1 id="new-document-heading" className="sr-only">
          Create a new document
        </h1>
        <TemplateGallery />
      </section>

      <section
        aria-labelledby="documents-heading"
        className="px-4 pb-12 pt-8 sm:px-6 lg:px-8"
      >
        <div className="mx-auto mb-4 max-w-7xl px-16">
          <h2 id="documents-heading" className="text-xl font-semibold">
            Your documents
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Open, search, and continue working on your documents.
          </p>
        </div>
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
}
