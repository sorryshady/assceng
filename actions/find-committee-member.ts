'use server'

import { db } from '@/db'

export const findCommitteeMembers = async(committee: string) => {
    if(committee === "state"){
        const members = await db.user.findMany({ where: { committeeStatus: 'STATE' } })
        return members
    } else if(committee === "district"){
        const members = await db.user.findMany({ where: { committeeStatus: 'DISTRICT' } })
        return members
    }
    else return []
}
