import Link from "next/link";
import React from "react";

function AdminCollectionsPage() {
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
        <h1 className="w-fit mx-auto text-2xl font-semibold">Коллекции</h1>
        <Link
          href="/admin/collections/new"
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

      <table className="w-full border-collapse border border-gray-400 overflow-x-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">#</th>
            <th className="border border-gray-400 p-2">Название</th>
            <th className="border border-gray-400 p-2">Коллекция</th>
            <th className="border border-gray-400 p-2">Цена</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white">
            <td className="border border-gray-400 p-2">1</td>
            <td className="border border-gray-400 p-2">2</td>
            <td className="border border-gray-400 p-2">1</td>
            <td className="border border-gray-400 p-2">6</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default AdminCollectionsPage;
