"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";

import Image from "next/image";

const AVATAR_SIZE = 36;

interface AvatarProps {
  name: string;
  src?: string;
}

const AvatarStack = () => {
  const users = useOthers();
  const currentUser = useSelf();

  if (users.length === 0) {
    return null;
  }

  return (
    <>
      <div className="flex items-center">
        {currentUser && (
          <div className="relative ml-2">
            <Avatar src={currentUser.info.avatar} name={"Me"} />
          </div>
        )}

        <div className="flex">
          {users.map(({ connectionId, info }) => (
            <Avatar key={connectionId} src={info.avatar} name={info.name} />
          ))}
        </div>
      </div>
    </>
  );
};

const Avatar = ({ name, src }: AvatarProps) => {
  return (
    <div
      className="group relative -ml-2 flex shrink-0 place-content-center rounded-full border-4 border-white bg-gray-400"
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
      }}
    >
      <div className="absolute top-full z-10 mt-2.5 whitespace-nowrap rounded-lg bg-black px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
        {name}
      </div>

      {src ? (
        <Image
          src={src}
          fill
          sizes={`${AVATAR_SIZE}px`}
          alt={name}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="flex size-full items-center justify-center rounded-full text-sm font-medium text-white">
          {name.charAt(0).toUpperCase()}
        </div>
      )}
    </div>
  );
};

const Avatars = () => {
  return (
    <ClientSideSuspense fallback={null}>
      <AvatarStack />
    </ClientSideSuspense>
  );
};

export default Avatars;
