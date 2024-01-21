"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type CollectionColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<CollectionColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Дата",
  },
  {
    accessorKey: "name",
    header: "Название",
  },
  {
    accessorKey: "id",
    header: "Id",
  },

  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
