"use server";

import { db } from '@/db'
import { UserRole } from '@prisma/client'

interface Props {
    email:string,
    role: UserRole
}

export async function changeUserRole({email, role}: Props) {
    console.log(email, role);
    await db.user.update({
        where: { email: email },
        data: { userRole: role },
    });
}
