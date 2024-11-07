'use server'

import { db } from '@/db'
import { clerkClient } from '@clerk/nextjs/server'

export const verifyClerkUser = async (clerkId: string ) => {

    const user = await db.user.findUnique({ where: { clerkId } })
    if (!user) {
        throw new Error('User not found')
    }
    return user
}
