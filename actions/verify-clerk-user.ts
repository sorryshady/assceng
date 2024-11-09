'use server'

import { db } from '@/db'

export const verifyClerkUser = async (clerkId: string | null | undefined ) => {
    if (!clerkId) {
        throw new Error('User id not present')
    }
    const user = await db.user.findUnique({ where: { clerkId } })
    if (!user) {
        throw new Error('User not found')
    }
    return user
}
