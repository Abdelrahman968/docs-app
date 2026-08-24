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
    <nav className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 w-full max-w-[1600px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex shrink-0 items-center">
          <Link
            href="/"
            className="group flex items-center rounded-xl p-1 transition-all duration-200 hover:bg-muted"
          >
            <Image
              src="/logo-home.svg"
              alt="Logo"
              width={145}
              height={48}
              priority
              className="h-auto w-31.25 object-contain transition-transform duration-200 group-hover:scale-[1.02] sm:w-35"
            />
          </Link>
        </div>

        <div className="mx-auto flex min-w-0 flex-1 justify-center px-2 sm:px-6">
          <div className="w-full max-w-2xl">
            <SearchInput />
          </div>
        </div>

        <div className="flex shrink-0 items-center">
          {!isLoaded ? (
            <div className="flex items-center gap-2">
              <div className="hidden h-9 w-32 animate-pulse rounded-lg bg-muted sm:block" />
              <div className="size-9 animate-pulse rounded-full bg-muted" />
            </div>
          ) : isSignedIn ? (
            <div className="flex items-center gap-2 rounded-xl border bg-background p-1 shadow-sm">
              <OrganizationSwitcher
                afterCreateOrganizationUrl="/"
                afterLeaveOrganizationUrl="/"
                afterSelectOrganizationUrl="/"
                afterSelectPersonalUrl="/"
                appearance={{
                  elements: {
                    rootBox: "h-9",
                    organizationSwitcherTrigger:
                      "h-9 rounded-lg border-0 px-2.5 hover:bg-muted transition-colors",
                  },
                }}
              />

              <div className="h-6 w-px bg-border" />

              <div className="flex size-9 items-center justify-center">
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "size-8",
                      userButtonTrigger:
                        "rounded-lg transition-all hover:ring-2 hover:ring-muted",
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <SignInButton mode="modal">
              <Button
                variant="outline"
                className="h-10 rounded-xl px-5 font-medium shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                Login
              </Button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
