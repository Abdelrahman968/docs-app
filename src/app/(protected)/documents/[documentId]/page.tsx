import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../../convex/_generated/dataModel";
import DocDetails from "@/app/(protected)/documents/[documentId]/DocDetails";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";

interface DocIdPageProps {
  params: Promise<{ documentId: Id<"documents"> }>;
}
async function DocIdPage({ params }: DocIdPageProps) {
  const { documentId } = await params;

  const { getToken } = await auth();
  const token = (await getToken({ template: "convex" })) ?? undefined;

  if (!token) {
    throw new Error("Not Authenticated");
  }

  const preloadedDocument = await preloadQuery(
    api.documents.getById,
    {
      id: documentId,
    },
    { token },
  );

  if (!preloadedDocument) {
    throw new Error("Document not found");
  }

  return <DocDetails preLoadedDocument={preloadedDocument} />;
}

export default DocIdPage;
