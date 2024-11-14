"use server";

import { db } from "@/db";

export async function fetchVerifiedUsers(userId: string | null | undefined) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/verified`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch verified users");
  }

  return response.json();
}

export const fetchPendingUsers = async (userId: string | null | undefined) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/admin/pending`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch pending users");
  }

  return response.json();
};
