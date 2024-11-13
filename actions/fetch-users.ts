'use server'

import { db } from '@/db'

export const fetchVerifiedUsers = async (userId?: string | null) => {
    const verifiedUsers = await db.user.findMany({
      where: {
        verifiedStatus: 'VERIFIED',
        ...(userId && { clerkId: { not: userId } }),
      },
    });
    if (verifiedUsers.length > 0) {
      return verifiedUsers;
    } else {
      return [];
    }
  };

export const fetchPendingUsers = async () => {
    const pendingUsers = await db.user.findMany({
      where: {
        verifiedStatus: 'PENDING',
      },
    });

    if (pendingUsers.length > 0) {
      return pendingUsers;
    } else {
      return [];
    }
  };
