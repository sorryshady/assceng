"use client";

import { useDeleteUser } from "@/hooks/use-delete-user";
import { PendingUserSchema, VerifiedUsersSchema } from "../data/tableSchema";
import { useVerifyUser } from "@/hooks/use-verify-user";
import { DataTable } from "./data-table";
import { verifiedColumns } from "./verifiedColumns";
import { pendingColumns } from "./pendingColumns";
import { useEffect, useState } from "react";
import { fetchPendingUsers, fetchVerifiedUsers } from "@/actions/fetch-users";
import { changeVerificationStatus, deleteUser } from "@/actions/admin-actions";
import { toast } from "sonner";
import { VerifiedStatus } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

interface TableClientProps {
  tab: "general" | "pending";
}
const TableClient = ({ tab }: TableClientProps) => {
  const { userId } = useAuth();
  const [verified, setVerified] = useState<VerifiedUsersSchema[]>();
  const [pending, setPending] = useState<PendingUserSchema[]>();
  
  useEffect(() => {
    const fetchData = async () => {
      if (tab === "general") {
        const users = await fetchVerifiedUsers(userId);
        setVerified(users);
      } else if (tab === "pending") {
        const users = await fetchPendingUsers();
        setPending(users);
      }
    };
    fetchData();
  }, [tab]);

  const handleDeleteUser = async (email: string) => {
    if (!verified) {
      return;
    }
    const updatedUsers = verified.filter((user) => user.email !== email);
    const response = await deleteUser(email);
    if (response.error) {
      toast.error(response.error);
    } else {
      setVerified(updatedUsers);
      toast.success("User deleted successfully!");
    }
  };
  const handleVerification = async (email: string, status: VerifiedStatus) => {
    if (!pending) {
      return;
    }
    const updatedUsers = pending.filter((user) => user.email !== email);
    const response = await changeVerificationStatus({ email, status });
    if (response.error) {
      toast.error(response.error);
    } else {
      setPending(updatedUsers);
      toast.success("User verification status updated successfully!");
    }
  };
  let columnsWithDelete;
  let columnsWithVerification;
  if (tab === "general") {
    columnsWithDelete = verifiedColumns(handleDeleteUser);
  } else if (tab === "pending") {
    columnsWithVerification = pendingColumns(handleVerification);
  }
  if (verified === undefined && pending === undefined) {
    return (
      <div className="flex flex-col gap-2 justify-center items-center">
        <Loader2 className="animate-spin h-10 w-10" />
        <div>Loading Users...</div>
      </div>
    );
  }
  return (
    <>
      {tab === "general" && verified && columnsWithDelete && (
        <DataTable data={verified} columns={columnsWithDelete} tab="general" />
      )}
      {}
      {tab === "pending" && pending && columnsWithVerification && (
        <DataTable
          data={pending}
          columns={columnsWithVerification}
          tab="pending"
        />
      )}
    </>
  );
};
export default TableClient;
