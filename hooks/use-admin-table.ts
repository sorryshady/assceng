// components/admin-table/hooks/useAdminTable.ts
"use client";

import { useState } from "react";
import { toast } from "sonner";
import { deleteUser } from "@/actions/admin-actions";
import { UserTableSchema } from '@/components/admin-table/data/schema'


export const useAdminTable = (initialUsers: UserTableSchema[]) => {
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
