"use server";

import { db } from "@/db";
import { CommitteeRole, EmploymentStatus, UserRole, VerifiedStatus } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs/server";

interface Props {
  email: string;
  role: UserRole;
}

export async function changeUserRole({ email, role }: Props) {
  try {
    await db.user.update({
      where: { email: email },
      data: { userRole: role },
    });
    return { success: "Updated user role to " + role };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update user role" };
  }
}
interface EmploymentStatusProps {
  email: string;
  status: EmploymentStatus;
}
export async function changeUserEmploymentStatus({ email, status }: EmploymentStatusProps) {
  try {
    await db.user.update({
      where: { email: email },
      data: { employmentStatus: status },
    });
    return { success: "Updated user employment status to " + status };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update user employment status" };
  }
}
interface CommitteProps {
  email: string;
  committee: CommitteeRole;
}
export async function changeUserCommittee({ email, committee }: CommitteProps) {
  try {
    await db.user.update({
      where: { email: email },
      data: { committeeStatus: committee },
    });
    return { success: "Updated user committee to " + committee };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update user committee" };
  }
}
interface CommitteeProps {
    email: string;
    status: VerifiedStatus;
  }
export async function changeVerificationStatus({ email, status }: CommitteeProps) {
  try {
    await db.user.update({
      where: { email: email },
      data: { verifiedStatus: status },
    });
    return { success: "Updated user committee to " + status };
  } catch (error) {
    console.error(error);
    return { error: "Failed to update user committee" };
  }
}

export async function deleteUser(email: string) {
  try {
    const user = await db.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found");
    }
    const userId = user.clerkId;
    if (!userId) {
      throw new Error("User not found");
    }
    await db.user.delete({ where: { clerkId: userId } });
    (await clerkClient()).users.deleteUser(userId);
    return { success: "User deleted successfully" };
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete user" };
  }
}
