import SearchInput from "@/app/(root)/SearchInput";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full px-10">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/" className="hover:scale-105 ease-in-out duration-300">
          <Image src="/logo-home.svg" alt="logo" width={160} height={160} />
        </Link>
      </div>
      <SearchInput />
      <div className="scale-125">
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;
