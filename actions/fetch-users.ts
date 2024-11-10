'use server'

import { db } from '@/db'

export const fetchVerifiedUsers = async() => {
    const verifiedUsers = await db.user.findMany({where: {verifiedStatus: 'VERIFIED'}})
    if (verifiedUsers) {
        return verifiedUsers
    } else {
        throw Error('No verified users found')
    }
}
