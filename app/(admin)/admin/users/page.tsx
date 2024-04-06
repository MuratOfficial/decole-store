import { DataTable } from "@/components/ui/data-table";
import Link from "next/link";
import React, { Suspense } from "react";
import { UserColumn, columns } from "./components/columns";
import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Loader } from "lucide-react";

async function AdminUsersPage() {
  const users = await prismadb.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedUsers: UserColumn[] = users.map((item) => ({
    id: item.id,
    email: item.email,
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
        <h1 className="w-fit mx-auto text-2xl font-semibold">Пользователи</h1>
        <Link
          href="/admin/users/new"
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
        <Suspense
          fallback={
            <div className="w-full h-full flex justify-center items-center">
              <Loader className="w-8 h-8 animate-spin" />
            </div>
          }
        >
          <DataTable columns={columns} data={formattedUsers} />
        </Suspense>
      </div>
    </div>
  );
}

export default AdminUsersPage;
