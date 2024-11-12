// components/admin-table/components/AdminTableClient.tsx
"use client";

import { DataTable } from "./data-table";
import { pendingColumns } from "./pending-columns";
import { PendingTableSchema } from "../data/schema";
import { usePendingTable } from "@/hooks/use-admin-table";

type AdminTableClientProps = {
  initialUsers: PendingTableSchema[];
};

export default function PendingTableClient({
  initialUsers,
}: AdminTableClientProps) {
  // Use the custom hook
  const { pendingUsers, handleVerification } = usePendingTable(initialUsers);
  const columnsWithVerification = pendingColumns(handleVerification);

  return <DataTable data={pendingUsers} columns={columnsWithVerification} />;
}
