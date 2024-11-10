'use server'
import { auth } from '@clerk/nextjs/server'

export async function fetchClerkId() {
    const { userId } = await auth()
    return userId
}
