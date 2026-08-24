"use client";

import { ReactNode } from "react";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

import { useParams } from "next/navigation";

import { Waveform } from "ldrs/react";
import "ldrs/react/Waveform.css";

import { getUser } from "@/app/(protected)/documents/[documentId]/action";

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();

  const roomId = params.documentId as string;

  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint="/api/liveblocks-auth"

      resolveUsers={async ({ userIds }) => {
        try {
          const users = await getUser();

          return userIds.map((userId) => {
            const user = users.find((user) => user.id === userId);

            if (!user) {
              return undefined;
            }

            return {
              name: user.name,
              avatar: user.avatar,
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

      resolveRoomsInfo={() => []}
    >
      <RoomProvider id={roomId}>
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
