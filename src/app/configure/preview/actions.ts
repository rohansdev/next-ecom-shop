"use server";

import { BASE_PRICE, PRODUCT_PRICES } from "@/constants/products";
import { db } from "@/prisma/db";
import { stripe } from "@/lib/stripe";
import { User } from "better-auth";

export const createCheckoutSession = async ({
  configId,
  user,
}: {
  configId: number;
  user: User;
}) => {
  const configuration = await db.orm.public.Configuration.first({
    id: configId,
  });

  if (!configuration) {
    throw new Error("No such design configuration found.");
  }

  if (!user) {
    throw new Error("You are not logged in.");
  }

  const { finishing, material } = configuration;

  let total = BASE_PRICE;
  if (finishing === "textured") {
    total += PRODUCT_PRICES.finish.textured.price;
  }

  if (material === "polycarbonate") {
    total += PRODUCT_PRICES.material.polycarbonate.price;
  }

  let order;

  const existingOrder = await db.orm.public.Order.first({
    userId: user.id,
    configurationId: configuration.id,
  });

  if (existingOrder) {
    order = existingOrder;
  } else {
    order = await db.orm.public.Order.create({
      configurationId: configuration.id,
      userId: user.id,
      orderTotal: total,
    });
  }

  const order_item = await stripe.products.create({
    name: "Custom iPhone Cover",
    images: [configuration.imageUrl],
    default_price_data: {
      currency: "USD",
      unit_amount: total,
    },
  });

  const stripe_session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/order-confirmation?orderId=${order.id}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/configure/preview?id=${configuration.id}`,
    payment_method_types: ["card", "paypal"],
    mode: "payment",
    shipping_address_collection: {
      allowed_countries: ["IN", "US", "DE", "CN", "NE"],
    },
    metadata: {
      userId: user.id,
      orderId: order.id,
    },
    line_items: [
      {
        price: order_item.default_price as string,
        quantity: 1,
      },
    ],
  });

  return { url: stripe_session.url };
};
