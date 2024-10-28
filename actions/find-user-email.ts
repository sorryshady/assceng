'use server'

import { db } from '@/db'
import { User } from '@prisma/client'

export const findUserEmail = async (email: string) => {
    const user = await db.user.findFirst({ where: { email } })
    return user as User
}
