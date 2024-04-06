"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type UserColumn = {
  id: string;
  email: string;
  createdAt: string;
};

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "id",
    header: "Id поль.",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
