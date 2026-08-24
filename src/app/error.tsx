"use client";

import { useEffect } from "react";
import { AlertTriangle, ArrowLeft, RefreshCw, Bug, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ErrorPageProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  useEffect(() => {
    console.error("Application Error:", error);
  }, [error]);

  const errorType = error?.name || "Error";
  const errorMessage = error?.message || "An unexpected error occurred.";

  const handleCopy = async () => {
    const text = [
      `Type: ${errorType}`,
      `Message: ${errorMessage}`,
      error.digest ? `Digest: ${error.digest}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    await navigator.clipboard.writeText(text);
  };

  return (
    <main className="min-h-screen bg-[#F9FBFD] flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="flex justify-center mb-6">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-red-50 border border-red-100">
            <AlertTriangle className="size-8 text-red-500" />
          </div>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-900">
            Something went wrong
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            An unexpected error occurred while loading this page.
          </p>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <Bug className="size-4 text-red-500" />

              <span className="text-sm font-medium text-neutral-800">
                Error Details
              </span>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-8"
            >
              <Copy className="size-3.5" />
              Copy
            </Button>
          </div>

          <div className="p-4 space-y-4">
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Type
              </p>

              <code className="block rounded-lg bg-neutral-100 px-3 py-2 text-sm font-mono text-red-600">
                {errorType}
              </code>
            </div>

            {/* Message */}
            <div>
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
                Message
              </p>

              <code className="block rounded-lg bg-neutral-100 px-3 py-2 text-sm font-mono text-neutral-700 wrap-break-word">
                {errorMessage}
              </code>
            </div>

            {error.digest && (
              <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-neutral-400">
                  Digest
                </p>

                <code className="block rounded-lg bg-neutral-100 px-3 py-2 text-sm font-mono text-neutral-700">
                  {error.digest}
                </code>
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <Button onClick={reset}>
            <RefreshCw className="size-4" />
            Try again
          </Button>

          <Button variant="outline" onClick={() => window.history.back()}>
            <ArrowLeft className="size-4" />
            Go back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
