import Link from "next/link";

function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">
        Click{" "}
        <Link
          href="/documents/123"
          className="underline bg-blue-500 text-white px-2 py-1 rounded"
        >
          here
        </Link>{" "}
        to Document ID Page
      </h1>
    </div>
  );
}

export default Home;
