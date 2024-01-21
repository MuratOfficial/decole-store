import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import React from "react";
import { ProductColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

async function AdminProductsPage() {
  const product = await prismadb.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      collection: true,
    },
  });

  const formattedProducts: ProductColumn[] = product.map((item) => ({
    id: item.id,
    availableForSale: item.availableForSale,
    title: item.title,
    price: item.price,
    collection: item.collection.name,

    createdAt: format(item.createdAt, "PPP", { locale: ru }),
  }));

  return (
    <div className="p-4 w-full items-center flex flex-col gap-4">
      <div className="w-full flex flex-row relative">
        <Link
          href="/admin"
          className="items-center text-sm text-center rounded-md bg-slate-300 px-2 py-2 flex flex-row gap-2 transition delay-150 duration-500 justify-center hover:bg-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
            />
          </svg>
          На главную
        </Link>
        <h1 className="w-fit mx-auto text-2xl font-semibold">Продукты</h1>
        <Link
          href="/admin/products/new"
          className="items-center text-sm text-center rounded-md bg-slate-300 px-2 py-2 flex flex-row gap-2 transition delay-150 duration-500 justify-center hover:bg-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Добавить
        </Link>
      </div>

      <div className="w-full">
        <DataTable columns={columns} data={formattedProducts} />
      </div>
    </div>
  );
}

export default AdminProductsPage;
