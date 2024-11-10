"use server";

import { db } from '@/db'
import { CommitteeRole, UserRole } from '@prisma/client'

interface Props {
    email:string,
    role: UserRole
}

export async function changeUserRole({email, role}: Props) {
    await db.user.update({
        where: { email: email },
        data: { userRole: role },
    });
}
interface CommitteProps {
    email: string,
    committee: CommitteeRole
}
export async function changeUserCommittee({email, committee}: CommitteProps) {
    await db.user.update({
        where: { email: email },
        data: { committeeStatus: committee },
    })
}
