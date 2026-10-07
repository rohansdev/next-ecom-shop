"use client";

import Link from "next/link";
import { useSession, signOut } from "@/lib/auth-client";

import { buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Navbar = () => {
  let user;
  const { data: session } = useSession();
  if (session?.user) {
    user = session.user;
  }
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <nav className="sticky z-100 h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link
            href="/"
            className="flex z-40 font-light bg-orange-600 p-1 rounded-tr-lg rounded-bl-lg text-white"
          >
            Design<span className="font-bold">My</span>Cover
          </Link>

          <div className="h-full flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  onClick={() => signOut()}
                  href={"#"}
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign-out
                </Link>
                {isAdmin ? (
                  <Link
                    onClick={() => signOut()}
                    href={"#"}
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Dashboard
                  </Link>
                ) : null}
                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Design Cover <ArrowRight className="h-5 w-5 ml-1.5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href={"/sign-up"}
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign-Up
                </Link>
                <Link
                  href={"/sign-in"}
                  className={buttonVariants({ size: "sm", variant: "ghost" })}
                >
                  Sign-In
                </Link>
                <div className="h-2 w-px bg-zinc-200 hidden sm:block" />
                <Link
                  href={"/configure/upload"}
                  className={buttonVariants({
                    size: "sm",
                    className: "hidden sm:flex items-center gap-1",
                  })}
                >
                  Design Cover <ArrowRight className="h-5 w-5 ml-1.5 inline" />
                </Link>
              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
