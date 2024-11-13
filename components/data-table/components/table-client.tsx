"use client";

import { PendingUserSchema, VerifiedUsersSchema } from "../data/tableSchema";

interface TableClientProps {
  users: VerifiedUsersSchema[] | PendingUserSchema[];
  tab: "general" | "pending";
}
const TableClient = ({ users, tab }: TableClientProps) => {
  return (
    <div className="h-screen w-full">
      <></>
    </div>
  );
};

export default TableClient;
