// components/admin-table/hooks/useAdminTable.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { changeVerificationStatus, deleteUser } from "@/actions/admin-actions";
import { UserTableSchema } from "@/components/admin-table/data/schema";
import { PendingTableSchema } from "@/components/pending-table/data/schema";
import { VerifiedStatus } from '@prisma/client'

export const useUserTable = (initialUsers: UserTableSchema[]) => {
  const [users, setUsers] = useState(initialUsers);

  const handleDeleteUser = async (email: string) => {
    // Optimistic UI update
    const updatedUsers = users.filter((user) => user.email !== email);
    setUsers(updatedUsers);

    // Attempt to delete and handle failure
    const response = await deleteUser(email);
    if (response.error) {
      setUsers(initialUsers); // Rollback on failure
      toast.error(response.error);
    } else {
      toast.success("User deleted successfully!");
    }
  };

  return { users, handleDeleteUser };
};
export const usePendingTable = (initialUsers: PendingTableSchema[]) => {
  const [pendingUsers, setPendingUsers] = useState(initialUsers);
  const handleVerification = async (email: string, status: VerifiedStatus) => {
    const updatedUsers = pendingUsers.filter((user) => user.email !== email);
    setPendingUsers(updatedUsers);
    const response = await changeVerificationStatus({email, status});
    if (response.error) {
        setPendingUsers(initialUsers);
        toast.error(response.error);
      } else {
        toast.success("User verification status updated successfully!");
      }
  };

  return { pendingUsers, handleVerification };
};
