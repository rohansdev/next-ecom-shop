"use client";

import { cn, formatPrice } from "@/lib/utils";
import Phone from "@/components/Phone";
import { useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import type { Models } from "@/prisma/contract";
import { COLORS, MODELS } from "@/validators/option-validator";
import { ArrowRight, Check } from "lucide-react";
import { BASE_PRICE, PRODUCT_PRICES } from "@/constants/products";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { createCheckoutSession } from "./actions";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/toast";
import { useSession } from "@/lib/auth-client";
import { User } from "better-auth";

type Configuration = Models.public_Configuration;

const confettiConfigs = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 200,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const CoverDesignPreview = ({
  configuration,
}: {
  configuration: Configuration;
}) => {
  let user: User;
  const { data: session } = useSession();
  if (session?.user) {
    user = session.user;
  }
  const router = useRouter();

  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowConfetti(true);
    }, 0);

    return () => window.clearTimeout(timer);
  });

  const { color, model, finishing, material } = configuration;
  const tailwindCssColor = COLORS.find(
    (supportedColor) => supportedColor.value === color,
  )?.tw;

  const { label: phoneModel } = MODELS.options.find(
    ({ value }) => value === model,
  );

  let orderTotal = BASE_PRICE;
  if (material === "polycarbonate") {
    orderTotal += PRODUCT_PRICES.material.polycarbonate.price;
  }
  if (finishing === "textured") {
    orderTotal += PRODUCT_PRICES.finish.textured.price;
  }

  const { mutate: createPaymentSession } = useMutation({
    mutationKey: ["get-checkout-session"],
    mutationFn: createCheckoutSession,
    onSuccess: ({ url }) => {
      if (url) router.push(url);
      else throw new Error("Unable to retrieve payment URL.");
    },
    onError: () => {
      toast.add({
        title: "Unknown Error",
        description: "Something went wrong with the servers. Please try again.",
        type: "error",
      });
    },
  });

  return (
    <>
      <div
        aread-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden flex justify-center"
      >
        <Confetti active={showConfetti} config={confettiConfigs} />
      </div>

      <div className="mt-20 grid grid-cols-1 text-sm sm:grid-cols-12 sm:grid-rows-1 sm:gap-x-6 md:gap-x-8 lg:gap-x-12">
        <div className="sm:col-span-4 md:col-span-3 md:row-span-2 md:row-end-2">
          <Phone
            className={cn(`bg-${tailwindCssColor}`)}
            imgSrc={configuration.croppedImageUrl!}
          />
        </div>

        <div className="mt-6 sm:col-span-9 sm:mt-0 md:row-end-1">
          <h3 className="text-3xl font-bold tracking-tight text-gray-900">
            Your {phoneModel} cover
          </h3>
          <div className="mt-3 flex items-center gap-1.5 text-base">
            <Check className="h-4 w-4 text-orange-500" />
            In stock & ready to ship.
          </div>
        </div>

        <div className="sm:col-span-12 md:col-span-9 text-base">
          <div className="grid grid-cols-1 gap-y-8 border-b border-gray-200 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
            <div>
              <p className="font-medium text-zinc-950">Highlights</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>Wireless charging compatible</li>
                <li>TPU shock absorption</li>
                <li>Packaging from recycled material</li>
                <li>2 years print warranty</li>
              </ol>
            </div>
            <div>
              <p className="font-medium text-zinc-950">Materials</p>
              <ol className="mt-3 text-zinc-700 list-disc list-inside">
                <li>High-quality, durable material</li>
                <li>Scratch & fingerprint resistant coating</li>
              </ol>
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-50 p-6 sm:rounded-lg sm:p-8">
              <div className="flow-root text-sm">
                <div className="flex items-center justify-between py-1 mt-2">
                  <p className="text-gray-900">Base Price:</p>
                  <p className="font-medium text-gray-900">
                    {formatPrice(BASE_PRICE)}
                  </p>
                </div>

                {finishing === "textured" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-900">Textured Finishing:</p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.finish.textured.price)}
                    </p>
                  </div>
                ) : null}

                {material === "polycarbonate" ? (
                  <div className="flex items-center justify-between py-1 mt-2">
                    <p className="text-gray-900">
                      Soft Polycarbonate Material:
                    </p>
                    <p className="font-medium text-gray-900">
                      {formatPrice(PRODUCT_PRICES.material.polycarbonate.price)}
                    </p>
                  </div>
                ) : null}

                <div className="my-2 h-px bg-gray-200" />

                <div className="flex items-center justify-between py-2">
                  <p className="font-semibold text-gray-900">Order Total:</p>
                  <p className="font-semibold text-gray-900">
                    {formatPrice(orderTotal)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end pb-12">
              <Button
                className="cursor-pointer px-4 sm:px-6 lg:px-8"
                onClick={() =>
                  createPaymentSession({ configId: configuration.id, user })
                }
              >
                Order Now <ArrowRight className="h-4 w-4 ml-1.5 inline" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoverDesignPreview;
