"use client";

import { BsCloudCheck } from "react-icons/bs";

import { Id } from "../../../../../convex/_generated/dataModel";

import { useEffect, useRef, useState } from "react";

import { useMutation } from "convex/react";

import { api } from "../../../../../convex/_generated/api";

interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}

const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const [value, setValue] = useState(title);
  const [isError, setIsError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.documents.updateById);

  useEffect(() => {
    if (!isEditing) return;

    const trimmedValue = value.trim();

    if (!trimmedValue || trimmedValue === title) return;

    const timeout = setTimeout(async () => {
      setIsPending(true);
      setIsError(false);

      try {
        await mutate({
          id,
          title: trimmedValue,
        });
      } catch (error) {
        console.error("Failed to update document title:", error);

        setIsError(true);
        setValue(title);
      } finally {
        setIsPending(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, isEditing, title, id, mutate]);

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        {isEditing ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsEditing(false);
            }}
            className="relative w-fit max-w-[50ch]"
          >
            <span className="invisible whitespace-pre px-1.5 text-lg">
              {value || ""}
            </span>

            <input
              type="text"
              ref={inputRef}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setIsError(false);
              }}
              onBlur={() => setIsEditing(false)}
              className={`absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate outline-none rounded-md ${
                isError
                  ? "border border-red-500 ring-2 ring-red-500/10"
                  : "border border-blue-500 ring-2 ring-blue-500/10"
              }`}
            />

            {isError && (
              <p className="absolute left-0 top-full z-50 mt-1 whitespace-nowrap rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 shadow-sm">
                You don&apos;t have permission to rename this document.
              </p>
            )}
          </form>
        ) : (
          <span
            onClick={() => {
              setIsError(false);
              setIsEditing(true);

              setTimeout(() => {
                inputRef.current?.focus();
                inputRef.current?.select();
              }, 0);
            }}
            className="text-lg px-1.5 cursor-pointer truncate"
          >
            {value}
          </span>
        )}
      </div>

      <BsCloudCheck
        className={`transition-opacity ${
          isPending ? "animate-pulse opacity-50" : "opacity-100"
        }`}
      />
    </div>
  );
};

export default DocumentInput;
