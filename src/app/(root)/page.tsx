"use client";

import Navbar from "@/app/(root)/Navbar";
import TemplateGallery from "@/app/(root)/TemplateGallery";
import DocumentsTable from "@/app/(root)/DocumentsTable";

import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

import { useSearchParam } from "@/hooks/use-search-param";

function HomePage() {
  const [search] = useSearchParam("search");

  const { results, status, loadMore, isLoading } = usePaginatedQuery(
    api.documents.getDocuments,
    {
      search,
    },
    {
      initialNumItems: 5,
    },
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="mx-auto w-full max-w-[1600px]">
        {/* Templates */}
        <section className="px-4 pt-8 sm:px-6 lg:px-8">
          <TemplateGallery />
        </section>

        {/* Documents */}
        <section className="px-4 pb-12 pt-8 sm:px-6 lg:px-8">
          <DocumentsTable
            documents={results}
            loadMore={loadMore}
            status={status}
            isLoading={isLoading}
          />
        </section>
      </main>
    </div>
  );
}

export default HomePage;
