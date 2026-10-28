"use client";

import type { Models } from "@/prisma/contract";
import { useEffect, useRef, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Configuration = Models.public_Configuration;
type CoverColor = NonNullable<Configuration>["color"];

const PhoneCoverPreview = ({
  croppedImageUrl,
  color,
}: {
  croppedImageUrl: string;
  color: CoverColor;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [renderedDimensions, setRenderedDimensions] = useState({
    height: 0,
    width: 0,
  });

  const handleResize = () => {
    if (!ref.current) return;

    const { width, height } = ref.current.getBoundingClientRect();

    setRenderedDimensions({ width, height });
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [ref.current]);

  let coverBgColor = "bg-zinc-950";
  if (color === "blue") coverBgColor = "bg-blue-950";
  if (color === "rose") coverBgColor = "bg-rose-950";

  return (
    <AspectRatio ref={ref} ratio={3000 / 2001} className="relative">
      <div
        className="absolute z-20 scale-[1.0352]"
        style={{
          left:
            renderedDimensions.width / 2 -
            renderedDimensions.width / (1216 / 121),
          top: renderedDimensions.height / 6.22,
        }}
      >
        <Image
          width={renderedDimensions.width / (3000 / 637)}
          height={renderedDimensions.height}
          alt="cover preview"
          className={cn(
            "phone-skew relative z-20 rounded-t-[15px] rounded-b-[10px] md:rounded-t-[30px] md:rounded-b-[20px]",
            coverBgColor,
          )}
          src={croppedImageUrl}
        />
      </div>

      <div className="relative h-full w-full z-40">
        <Image
          width={3000}
          height={2001}
          alt="phone"
          src={"/clearphone.png"}
          className="pointer-events-none h-full w-full antialised rounded-md"
        />
      </div>
    </AspectRatio>
  );
};

export default PhoneCoverPreview;
