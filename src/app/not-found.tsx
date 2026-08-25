import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F9FBFD] px-6">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="mb-6 flex size-20 items-center justify-center rounded-2xl bg-neutral-100">
          <FileQuestion className="size-10 text-neutral-500" />
        </div>

        <p className="mb-2 text-sm font-medium text-neutral-500">Error 404</p>

        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          Page not found
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <Link
          href="/documents"
          className="mt-8 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          <ArrowLeft className="size-4" />
          Back to Documents
        </Link>
      </div>
    </main>
  );
}
