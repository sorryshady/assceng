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
import {
  committeeStatus,
  department,
  designation,
  employmentStatus,
  gender,
  userRole,
} from "../data/data";
import { DataTableColumnHeader } from "./data-table-column";
import { changeUserCommittee, changeUserRole } from "@/actions/admin-actions";
import { CommitteeRole, UserRole } from "@prisma/client";
import { getDistrictFullName } from "@/lib/district-mapping";

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
  {
    accessorKey: "workingDistrict",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Working District" />
    ),
    cell: ({ row }) => (
      <div className="">
        {getDistrictFullName(row.getValue("workingDistrict"))}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Gender" />
    ),
    cell: ({ row }) => {
      const userGender = gender.find(
        (gender) => gender.value === row.getValue("gender"),
      );
      if (!userGender) {
        return null;
      }
      return <div className="">{userGender.label}</div>;
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
      return <div className="">{userDesignation.label}</div>;
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
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employmentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employment Status" />
    ),
    cell: ({ row }) => {
      const userEmploymentStatus = employmentStatus.find(
        (employmentStatus) =>
          employmentStatus.value === row.getValue("employmentStatus"),
      );
      if (!userEmploymentStatus) {
        return null;
      }
      return <div className="">{userEmploymentStatus.label}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "committeeStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Committee" />
    ),
    cell: ({ row }) => {
      const currentCommittee = committeeStatus.find(
        (status) => status.value === row.getValue("committeeStatus"),
      );
      if (!currentCommittee) {
        return null;
      }
      return (
        <Select
          defaultValue={currentCommittee.value}
          onValueChange={async (newCommittee) =>
            await changeUserCommittee({
              email: row.getValue("email"),
              committee: newCommittee as CommitteeRole,
            })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue defaultValue={currentCommittee.value} />
          </SelectTrigger>
          <SelectContent>
            {committeeStatus.map((status) => (
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
