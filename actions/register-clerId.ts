"use server";

import { db } from "@/db";
import { auth } from "@clerk/nextjs/server";

export async function registerClerkId(email: string) {
  const { userId } = await auth();
  if (userId) {
    await db.user.update({ where: { email }, data: { clerkId: userId } });
  }
}
