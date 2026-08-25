import type { Metadata } from "next";
import { Suspense } from "react";

import Navbar from "@/app/(root)/Navbar";
import DocumentsView from "./DocumentsView";

export const metadata: Metadata = {
  title: "Your Documents | Docx",
  description:
    "Create, find, and edit your documents with real-time collaboration in Docx.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DocumentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Suspense
        fallback={
          <main className="mx-auto min-h-[calc(100vh-4.5rem)] w-full max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
            <div className="h-10 w-64 animate-pulse rounded-lg bg-muted" />
            <div className="mt-8 h-48 animate-pulse rounded-xl bg-muted" />
            <div className="mt-8 h-64 animate-pulse rounded-xl bg-muted" />
          </main>
        }
      >
        <DocumentsView />
      </Suspense>
    </div>
  );
}
