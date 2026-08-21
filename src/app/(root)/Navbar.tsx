"use client";

import SearchInput from "@/app/(root)/SearchInput";
import { Button } from "@/components/ui/button";
import {
  UserButton,
  SignInButton,
  useAuth,
  OrganizationSwitcher,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="flex items-center justify-between h-full w-full px-10">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/" className="hover:scale-105 ease-in-out duration-300">
          <Image src="/logo-home.svg" alt="logo" width={160} height={160} />
        </Link>
      </div>

      <SearchInput />

      <div className="scale-125">
        {!isLoaded ? (
          <div className="h-9 w-20 animate-pulse rounded-md bg-neutral-200" />
        ) : isSignedIn ? (
          <div className="flex gap-3 items-center shrink-0 pl-6">
            <OrganizationSwitcher
              afterCreateOrganizationUrl="/"
              afterLeaveOrganizationUrl="/"
              afterSelectOrganizationUrl="/"
              afterSelectPersonalUrl="/"
            />
            <UserButton />
          </div>
        ) : (
          <SignInButton mode="modal">
            <Button variant={"outline"}>Login</Button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
