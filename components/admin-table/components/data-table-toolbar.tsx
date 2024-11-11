"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import {
  committeeStatus,
  department,
  designation,
  employmentStatus,
  gender,
  userRole,
  workingDistrict,
} from "../data/data";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col flex-1 items-start space-y-2">
        <Input
          placeholder="Search using name or email..."
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="flex flex-1 flex-wrap gap-2">
          {table.getColumn("userRole") && (
            <DataTableFacetedFilter
              column={table.getColumn("userRole")}
              title="User Role"
              options={userRole}
            />
          )}
          {table.getColumn("workingDistrict") && (
            <DataTableFacetedFilter
              column={table.getColumn("workingDistrict")}
              title="Working District"
              options={workingDistrict}
            />
          )}
          {table.getColumn("gender") && (
            <DataTableFacetedFilter
              column={table.getColumn("gender")}
              title="Gender"
              options={gender}
            />
          )}
          {table.getColumn("designation") && (
            <DataTableFacetedFilter
              column={table.getColumn("designation")}
              title="Designation"
              options={designation}
            />
          )}
          {table.getColumn("department") && (
            <DataTableFacetedFilter
              column={table.getColumn("department")}
              title="Department"
              options={department}
            />
          )}
          {table.getColumn("employmentStatus") && (
            <DataTableFacetedFilter
              column={table.getColumn("employmentStatus")}
              title="Status"
              options={employmentStatus}
            />
          )}
          {table.getColumn("committeeStatus") && (
            <DataTableFacetedFilter
              column={table.getColumn("committeeStatus")}
              title="Committee"
              options={committeeStatus}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
