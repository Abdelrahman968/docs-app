import Navbar from "@/app/(root)/Navbar";
import Link from "next/link";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10 h-16 bg-white p-4">
        <Navbar />
      </div>
      <div className="text-3xl font-bold mt-16">
        Click{" "}
        <Link
          href="/documents/123"
          className="underline bg-blue-500 text-white px-2 py-1 rounded"
        >
          here
        </Link>{" "}
        to Document ID Page
      </div>
    </div>
  );
}

export default Home;
