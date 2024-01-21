"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type ProductColumn = {
  id: string;
  availableForSale: boolean;
  title: string;
  price: string;
  collection: string;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "createdAt",
    header: "Дата",
  },
  {
    accessorKey: "availableForSale",
    header: "К продаже",
  },
  {
    accessorKey: "title",
    header: "Название",
  },
  {
    accessorKey: "price",
    header: "Цена",
  },
  {
    accessorKey: "collection",
    header: "Коллекция",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
