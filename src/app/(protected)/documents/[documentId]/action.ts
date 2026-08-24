"use server";

import { auth, clerkClient, currentUser } from "@clerk/nextjs/server";

type ClerkSessionClaims = {
  o?: {
    id?: string;
    rol?: string;
    slg?: string;
  };
};

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
