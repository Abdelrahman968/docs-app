"use server";

import { ConvexHttpClient } from "convex/browser";
import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";
import { Id } from "../../../../../convex/_generated/dataModel";
import { api } from "../../../../../convex/_generated/api";

type ClerkSessionClaims = {
  o?: {
    id?: string;
    rol?: string;
    slg?: string;
  };
};

function getConvexClient() {
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
}

export async function getDocuments(ids: Id<"documents">[]) {
  const { getToken } = await auth();

  const token = await getToken({ template: "convex" });

  const convex = getConvexClient();

  if (token) {
    convex.setAuth(token);
  }

  return await convex.query(api.documents.getByIds, { ids });
}

export async function getCurrentUserId() {
  const user = await currentUser();

  return user?.id ?? null;
}

export async function getUser() {
  const { sessionClaims } = await auth();

  if (!sessionClaims) {
    return [];
  }

  const claims = sessionClaims as ClerkSessionClaims;

  const organizationId = claims.o?.id;

  if (!organizationId) {
    return [];
  }

  const clerk = await clerkClient();

  const res = await clerk.users.getUserList({
    organizationId: [organizationId],
  });

  return res.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
    email: user.primaryEmailAddress?.emailAddress ?? "",
    avatar: user.imageUrl,
  }));
}
