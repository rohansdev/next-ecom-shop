import { stripe } from "@/lib/stripe";
import { db } from "@/prisma/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

function getAddressData(
  name: string | null | undefined,
  address: Stripe.Address | null | undefined,
  phoneNumber?: string | null,
) {
  if (!name || !address?.line1 || !address.city || !address.country || !address.postal_code) {
    throw new Error("Checkout session is missing required address details.");
  }

  return {
    name,
    street: [address.line1, address.line2].filter(Boolean).join(", "),
    city: address.city,
    state: address.state,
    country: address.country,
    zipcode: address.postal_code,
    phoneNumber,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      return new Response("Invalid signature", { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      throw new Error("Missing Stripe webhook secret.");
    }

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const customerDetails = session.customer_details;

      if (!customerDetails?.email) {
        throw new Error("Missing user email.");
      }

      const userId = Number(session.metadata?.userId);
      const orderId = Number(session.metadata?.orderId);

      if (
        !Number.isSafeInteger(userId) ||
        userId <= 0 ||
        !Number.isSafeInteger(orderId) ||
        orderId <= 0
      ) {
        throw new Error("Invalid request.");
      }

      const billingAddress = getAddressData(
        customerDetails.name,
        customerDetails.address,
        customerDetails.phone,
      );
      const shippingDetails = session.collected_information?.shipping_details;
      if (!shippingDetails) {
        throw new Error("Checkout session is missing shipping details.");
      }
      const shippingAddress = getAddressData(
        shippingDetails.name,
        shippingDetails.address,
      );

      await db.transaction(async (tx) => {
        const order = await tx.orm.public.Order.where({ id: orderId, userId }).first();

        if (!order) {
          throw new Error("Order not found for checkout session.");
        }

        if (order.isPaid) {
          return;
        }

        const createdBillingAddress =
          await tx.orm.public.BillingAddress.create(billingAddress);
        const createdShippingAddress =
          await tx.orm.public.ShippingAddress.create(shippingAddress);
        const updatedOrder = await tx.orm.public.Order
          .where({ id: orderId, userId, isPaid: false })
          .update({
            isPaid: true,
            billingAddressId: createdBillingAddress.id,
            shippingAddressId: createdShippingAddress.id,
          });

        if (!updatedOrder) {
          throw new Error("Order was already updated by another webhook request.");
        }
      });
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);

    // send error to sentry or graylogs

    return NextResponse.json(
      { message: "Something went wrong.", ok: false },
      { status: 500 },
    );
  }
}
