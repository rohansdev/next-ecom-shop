"use client";

import { useQuery } from "@tanstack/react-query";
import { getPaymentStatus } from "./actions";
import { useSession } from "@/lib/auth-client";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import PhoneCoverPreview from "@/components/PhoneCoverPreview";
import { formatPrice } from "@/lib/utils";

const ConfirmationPage = () => {
  const searchParams = useSearchParams();
  const orderId = Number(searchParams.get("orderId")) || 0;

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const { data } = useQuery({
    queryKey: ["get-payment-status", orderId, user?.id],
    queryFn: async () => {
      if (!user?.id || !user.email) {
        throw new Error("Only logged in users are allowed to visit this page.");
      }

      return getPaymentStatus({ orderId, user });
    },
    enabled: !isPending && Boolean(user?.id && user.email),
    retry: true,
    retryDelay: 500,
  });

  console.log("data: ", data);

  if (isPending) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading order details...</h3>
          <p>Please wait!!</p>
        </div>
      </div>
    );
  }

  if (!user) {
    throw new Error("You are not logged in.");
  } else if (!user.id || !user.email) {
    throw new Error("Only logged in users are allowed to visit this page.");
  }

  if (data === undefined) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Loading order details...</h3>
          <p>Please wait!!</p>
        </div>
      </div>
    );
  }

  if (data === false) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
          <h3 className="font-semibold text-xl">Verifying payment status...</h3>
          <p>Please wait!!</p>
        </div>
      </div>
    );
  }

  const { configuration, billingAddress, shippingAddress, orderTotal } = data;
  const { color } = configuration;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="max-w-xl">
          <p className="text-base font-medium text-primary">Thank you!</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Your designed phone cover is on the way!
          </h1>
          <p className="mt-2 text-base text-zinc-500">
            Your order is received and will be processed now.
          </p>

          <div className="mt-12 text-sm font-medium">
            <p className="text-zinc-900">Order Number</p>
            <p className="mt-2 text-zinc-500">{orderId}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-200">
          <div className="mt-10 flex flex-auto flex-col">
            <h4 className="font-semibold text-zinc-900">
              You made a great choice!
            </h4>
            <p className="mt-2 text-sm text-zinc-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              repellat voluptas doloribus blanditiis minus. Totam similique
              earum distinctio saepe dicta nihil ipsam aliquam impedit, laborum,
              nobis, corrupti porro harum corporis.
            </p>
          </div>
        </div>

        <div className="flex space-x-6 overflow-hidden mt-4 rounded-xl bg-gray-900/5 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl">
          <PhoneCoverPreview
            croppedImageUrl={configuration.croppedImageUrl!}
            color={color!}
          />
        </div>

        <div>
          <div className="grid grid-cols-2 gap-x-6 py-10 text-sm">
            <div>
              <p className="font-medium text-gray-900">Shipping Address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{shippingAddress?.name}</span>
                  <span className="block">{shippingAddress?.street}</span>
                  <span className="block">
                    {shippingAddress?.zipcode} {shippingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
            <div>
              <p className="font-medium text-gray-900">Billing Address</p>
              <div className="mt-2 text-zinc-700">
                <address className="not-italic">
                  <span className="block">{billingAddress?.name}</span>
                  <span className="block">{billingAddress?.street}</span>
                  <span className="block">
                    {billingAddress?.zipcode} {billingAddress?.city}
                  </span>
                </address>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 border-t border-zinc-200 py-10 text-sm">
            <div>
              <p className="font-medium text-zinc-900">Payment Status</p>
              <p className="mt-2 text-zinc-700">Paid</p>
            </div>
            <div>
              <p className="font-medium text-zinc-900">Shipping Method</p>
              <p className="mt-2 text-zinc-700">USPS (Time varies)</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 border-t border-zinc-200 pt-10 text-sm">
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Sub-Total</p>
            <p className="text-zinc-700">{formatPrice(orderTotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Shipping</p>
            <p className="text-zinc-700">{formatPrice(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-zinc-900">Total</p>
            <p className="text-zinc-700">{formatPrice(2 + orderTotal)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
