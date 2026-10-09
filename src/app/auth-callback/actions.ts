"use server";

import { auth } from "@/lib/auth";
import { db } from "@/prisma/db";
import { headers } from "next/headers";

export const getAuthStatus = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!session?.user || !user?.id || !user?.email) {
    throw new Error("Invalid or no user data.");
  }

  const existingUser = await db.orm.public.User.first({
    id: Number(user.id),
  });

  if (!existingUser) {
    await db.orm.public.User.create({
      id: Number(user.id),
      email: user.email,
    });
  }

  return { success: true };
};
