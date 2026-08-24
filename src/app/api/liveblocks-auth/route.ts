import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { auth, currentUser } from "@clerk/nextjs/server";

import { api } from "../../../../convex/_generated/api";

type ClerkSessionClaims = {
  o?: {
    id?: string;
    rol?: string;
    slg?: string;
  };
};

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(req: Request) {
  try {
    const { sessionClaims } = await auth();

    if (!sessionClaims) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const { room } = await req.json();

    if (!room) {
      return new Response("Room is required", {
        status: 400,
      });
    }

    const document = await convex.query(api.documents.getById, {
      id: room,
    });

    if (!document) {
      return new Response("Document not found", {
        status: 404,
      });
    }

    const claims = sessionClaims as ClerkSessionClaims;

    const organizationId = claims.o?.id;

    const isOwner = document.ownerID === user.id;

    const isOrganizationMember =
      !!document.organizationID &&
      !!organizationId &&
      document.organizationID === organizationId;

    if (!isOwner && !isOrganizationMember) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name:
          user.fullName ??
          user.primaryEmailAddress?.emailAddress ??
          "Anonymous",
        avatar: user.imageUrl,
      },
    });

    session.allow(room, ["*:write"]);

    const { body, status } = await session.authorize();

    return new Response(body, {
      status,
    });
  } catch (error) {
    console.error("Liveblocks authentication error:", error);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
