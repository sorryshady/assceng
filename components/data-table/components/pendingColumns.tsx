"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// import { DataTableColumnHeader } from "./data-table-column";
import {
  changeUserEmploymentStatus,
  changeUserRole,
  changeVerificationStatus,
  deleteUser,
} from "@/actions/admin-actions";
import { EmploymentStatus, UserRole, VerifiedStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PendingUserSchema, VerifiedUsersSchema } from "../data/tableSchema";
import { DataTableColumnHeader } from "./data-table-column";
import {
  department,
  designation,
  employmentStatus,
  userRole,
  verifiedStatus,
} from "../data/data";

export const pendingColumns = (
  handleVerification: (email: string, status: VerifiedStatus) => Promise<void>,
): ColumnDef<PendingUserSchema>[] => [
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
    cell: ({ row }) => (
      <div className="w-32 truncate">{row.getValue("name")}</div>
    ),
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => (
      <div className="w-32 truncate">{row.getValue("email")}</div>
    ),
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
          onValueChange={async (newRole) => {
            const response = await changeUserRole({
              email: row.getValue("email"),
              role: newRole as UserRole,
            });
            if (response.error) {
              toast.error(response.error);
            } else {
              toast.success(response.success);
            }
          }}
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "designation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Designation" />
    ),
    cell: ({ row }) => {
      const userDesignation = designation.find(
        (designation) => designation.value === row.getValue("designation"),
      );
      if (!userDesignation) {
        return null;
      }
      return <div className="w-32 truncate">{userDesignation.label}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      const userDepartment = department.find(
        (department) => department.value === row.getValue("department"),
      );
      if (!userDepartment) {
        return null;
      }
      return <div className="">{userDepartment.label}</div>;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employmentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const currentStatus = employmentStatus.find(
        (status) => status.value === row.getValue("employmentStatus"),
      );
      if (!currentStatus) {
        return null;
      }
      return (
        <Select
          defaultValue={currentStatus.value}
          onValueChange={async (newStatus) => {
            const response = await changeUserEmploymentStatus({
              email: row.getValue("email"),
              status: newStatus as EmploymentStatus,
            });
            if (response.error) {
              toast.error(response.error);
            } else {
              toast.success(response.success);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue defaultValue={currentStatus.value} />
          </SelectTrigger>
          <SelectContent>
            {employmentStatus.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                <span>{status.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "verifiedStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified Status" />
    ),
    cell: ({ row }) => {
      const currentStatus = verifiedStatus.find(
        (status) => status.value === row.getValue("verifiedStatus"),
      );
      if (!currentStatus) {
        return null;
      }
      return (
        <Select
          defaultValue={currentStatus.value}
          onValueChange={async (newStatus) =>
            await handleVerification(
              row.getValue("email"),
              newStatus as VerifiedStatus,
            )
          }
          //   onValueChange={async (newStatus) => {
          //     const response = await changeVerificationStatus({
          //       email: row.getValue("email"),
          //       status: newStatus as VerifiedStatus,
          //     });
          //     if (response.error) {
          //       toast.error(response.error);
          //     } else {
          //       toast.success(response.success);
          //     }
          //   }}
        >
          <SelectTrigger className="w-full">
            <SelectValue defaultValue={currentStatus.value} />
          </SelectTrigger>
          <SelectContent>
            {verifiedStatus.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                <span>{status.label}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
];
