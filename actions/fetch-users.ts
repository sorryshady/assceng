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
      throw new Error('No verified users found');
    }
  };

export const fetchPendingUsers = async () => {
    const verifiedUsers = await db.user.findMany({
      where: {
        verifiedStatus: 'PENDING',
      },
    });

    if (verifiedUsers.length > 0) {
      return verifiedUsers;
    } else {
      throw new Error('No verified users found');
    }
  };
