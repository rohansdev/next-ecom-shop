import { cn } from "@/lib/utils";
import Image from "next/image";
import { HTMLAttributes } from "react";

interface PhoneProps extends HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  darkMode?: boolean;
}

const Phone = ({
  imgSrc,
  className,
  darkMode = false,
  ...props
}: PhoneProps) => {
  return (
    <div
      className={cn(
        "relative pointer-events-none z-50 overflow-hidden",
        className,
      )}
      {...props}
    >
      <Image
        src={darkMode ? "/phone-template-dark-edges.png" : "/phone-template-white-edges.png"}
        className="pointer-events-none z-50 select-none w-full"
        alt="phone image"
        width={100}
        height={100}
      />
      <div className="absolute -z-10 inset-0">
        <Image
          src={imgSrc}
          alt="overlay phone image"
          className="object-cover w-full"
          width={64}
          height={64}
        />
      </div>
    </div>
  );
};

export default Phone;
