"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserTableSchema } from "../data/schema";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userRole } from "../data/data";
import { DataTableColumnHeader } from "./data-table-column";
import { changeUserRole } from "@/actions/admin-actions";
import { UserRole } from "@prisma/client";

export const columns: ColumnDef<UserTableSchema>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("name")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="w-fit">{row.getValue("email")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "userRole",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User Role" />
    ),
    cell: ({ row }) => {
      const currentRole = userRole.find(
        (role) => role.value === row.getValue("userRole"),
      );
      if (!currentRole) {
        return null;
      }
      return (
        <Select
          defaultValue={currentRole.value}
          onValueChange={async (newRole) =>
            await changeUserRole({
              email: row.getValue("email"),
              role: newRole as UserRole,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue defaultValue={currentRole.value} />
          </SelectTrigger>
          <SelectContent>
            {userRole.map((role) => (
              <SelectItem key={role.value} value={role.value}>
                <span>{role.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
