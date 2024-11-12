// components/admin-table/components/AdminTableClient.tsx
"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { UserTableSchema } from "../data/schema";
import { useUserTable } from "@/hooks/use-admin-table";

type AdminTableClientProps = {
  initialUsers: UserTableSchema[];
};

export default function AdminTableClient({
  initialUsers,
}: AdminTableClientProps) {
  // Use the custom hook
  const { users, handleDeleteUser } = useUserTable(initialUsers);
  const columnsWithDelete = columns(handleDeleteUser);

  return <DataTable data={users} columns={columnsWithDelete} />;
}
