'use server'

import { db } from '@/db'

export const fetchVerifiedUsers = async (userId?: string | null) => {
    console.log(userId);
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
