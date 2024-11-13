import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const user = await db.user.findUnique({ where: { clerkId: userId } });
    if (!user || user.userRole !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const verifiedUsers = await db.user.findMany({
      where: { verifiedStatus: "VERIFIED", clerkId: { not: userId } },
    });
    return NextResponse.json(verifiedUsers);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch verified users" },
      { status: 500 },
    );
  }
}
