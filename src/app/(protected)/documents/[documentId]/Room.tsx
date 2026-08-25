"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";

import {
  getDocuments,
  getUser,
} from "@/app/(protected)/documents/[documentId]/action";
import { getCurrentUserId } from "@/app/(protected)/documents/[documentId]/action";
import { Id } from "../../../../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/constants/margin";
import { getUserColor } from "@/lib/get-user-color";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  const roomId = params.documentId as string;

  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    getCurrentUserId().then(setCurrentUserId);
  }, []);

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endPoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const res = await fetch(endPoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ room }),
        });

        return await res.json();
      }}
      resolveUsers={async ({ userIds }) => {
        try {
          const users = await getUser();

          return userIds.map((userId) => {
            const user = users.find((user) => user.id === userId);

            if (!user) {
              return undefined;
            }

            return {
              name: userId === currentUserId ? "Me" : user.name,
              avatar: user.avatar,
              color: getUserColor(user.name),
            };
          });
        } catch (error) {
          console.error("Failed to resolve users:", error);
          return userIds.map(() => undefined);
        }
      }}
      resolveMentionSuggestions={async ({ text }) => {
        try {
          const users = await getUser();

          const search = text.trim().toLowerCase();

          if (!search) {
            return users.map((user) => user.id);
          }

          return users
            .filter((user) => user.name.toLowerCase().includes(search))
            .map((user) => user.id);
        } catch (error) {
          console.error("Failed to resolve mention suggestions:", error);
          return [];
        }
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documentIds = roomIds.map((roomId) =>
          roomId.replace("document:", ""),
        ) as Id<"documents">[];

        const documents = await getDocuments(documentIds);

        return documents.map((document) => ({
          id: document.id,
          name: document.name,
        }));
      }}
    >
      <RoomProvider
        id={roomId}
        initialStorage={{
          leftMargin: LEFT_MARGIN_DEFAULT,
          rightMargin: RIGHT_MARGIN_DEFAULT,
        }}
      >
        <ClientSideSuspense
          fallback={
            <div className="flex min-h-screen flex-col items-center justify-center gap-2">
              <Waveform size="35" stroke="3.5" speed="1" color="black" />
              <span className="text-center">Loading Room</span>
            </div>
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
