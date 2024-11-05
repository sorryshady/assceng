'use server'

import { db } from '@/db'

export const verifyClerkUser = async (clerkId: string ) => {
    const user = await db.user.findUnique({ where: { clerkId } })
    if (!user) {
        throw new Error('User not found')
    }
    return user
}
