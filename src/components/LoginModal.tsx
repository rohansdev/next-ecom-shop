import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { buttonVariants } from "./ui/button";
import Link from "next/link";

const LoginModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogContent className="absolute z-9999999">
        <DialogHeader>
          <div className="relative mx-auto w-24 mb-2">
            <Image
              src="/snake-1.png"
              alt="snake image"
              width={100}
              height={100}
              className="object-contain"
            />
          </div>
          <DialogTitle className="text-3xl text-center font-bold tracking-tight ">
            Sign in to continue..
          </DialogTitle>
          <DialogDescription className="text-base text-gray-900 text-center py-2">
            <span className="font-medium text-orange-700">
              Current design progress is saved.
            </span>{" "}
            Please sign-in or sign-up to complete your order.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 divide-x divide-gray-200">
          <Link
            href={"/sign-in?callback=auth-callback"}
            className={buttonVariants({
              size: "sm",
              className: "hidden sm:flex items-center gap-1",
            })}
          >
            Sign-in
          </Link>
          <Link
            href={"/sign-up?callback=auth-callback"}
            className={buttonVariants({
              size: "sm",
              className: "hidden sm:flex items-center gap-1",
            })}
          >
            Sign-up
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
