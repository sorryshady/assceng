// components/admin-table/hooks/useAdminTable.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { changeVerificationStatus } from "@/actions/admin-actions";
import { VerifiedStatus } from "@prisma/client";
import { PendingUserSchema } from "@/components/data-table/data/tableSchema";

export const useVerifyUser = (
  initialUsers: PendingUserSchema[] | undefined,
) => {
  const [pendingUsersData, setPendingUsersData] = useState(initialUsers);
  if (!pendingUsersData) {
    return { pendingUsersData, handleVerification: () => {} };
  }
  const handleVerification = async (email: string, status: VerifiedStatus) => {
    const updatedUsers = pendingUsersData.filter((user) => user.email !== email);
    const response = await changeVerificationStatus({ email, status });
    if (response.error) {
      setPendingUsersData(initialUsers);
      toast.error(response.error);
    } else {
      setPendingUsersData(updatedUsers);
      toast.success("User verification status updated successfully!");
    }
  };

  return { pendingUsersData , handleVerification };
};
