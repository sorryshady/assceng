// components/admin-table/hooks/useAdminTable.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { changeVerificationStatus } from "@/actions/admin-actions";
import { VerifiedStatus } from '@prisma/client'
import { PendingUserSchema } from '@/components/data-table/data/tableSchema'

export const usePendingTable = (initialUsers: PendingUserSchema[]) => {
  const [pendingUsers, setPendingUsers] = useState(initialUsers);
  const handleVerification = async (email: string, status: VerifiedStatus) => {
    const updatedUsers = pendingUsers.filter((user) => user.email !== email);
    const response = await changeVerificationStatus({email, status});
    if (response.error) {
        setPendingUsers(initialUsers);
        toast.error(response.error);
      } else {
        setPendingUsers(updatedUsers);
        toast.success("User verification status updated successfully!");
      }
  };

  return { pendingUsers, handleVerification };
};
