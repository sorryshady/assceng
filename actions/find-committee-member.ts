"use server";

import { db } from "@/db";

export const findCommitteeMembers = async (committee: string) => {
  if (committee === "state") {
    const members = await db.user.findMany({
      where: { committeeStatus: "STATE", verifiedStatus: 'VERIFIED' },
    });
    return members;
  } else if (committee === "district") {
    const members = await db.user.findMany({
      where: { committeeStatus: "DISTRICT", verifiedStatus: 'VERIFIED' },
    });
    return members;
  } else return [];
};
