"use client";

import Navbar from "@/app/(root)/Navbar";
import TemplateGallery from "@/app/(root)/TemplateGallery";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function Home() {
  const documents = useQuery(api.documents.getDocuments);

  if (documents === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        {documents?.map((document) => (
          <div key={document._id}>{document.title}</div>
        ))}
      </div>
    </div>
  );
}

export default Home;
