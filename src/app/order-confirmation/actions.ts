"use server";

import { db } from "@/prisma/db";
import { User } from "better-auth";

export const getPaymentStatus = async ({
  orderId,
  user,
}: {
  orderId: number;
  user: User;
}) => {
  const order = await db.orm.public.Order.where({
    id: Number(orderId),
    userId: Number(user.id),
  })
    .include("shippingAddress")
    .include("billingAddress")
    .include("configuration")
    .include("user")
    .first();

  if (!order) {
    throw new Error("Order not fuond.");
  }

  if (order.isPaid) {
    return order;
  } else {
    return false;
  }
};
