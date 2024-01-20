import Link from "next/link";
import React from "react";

function AdminPage() {
  return (
    <div className="p-4 w-full items-center flex flex-col gap-4">
      <h1 className="w-fit mx-auto text-2xl font-semibold">
        Панель управления продукцией
      </h1>
      <div className="w-full grid grid-flow-row grid-cols-3 gap-4">
        <div className="border rounded-md p-4 row-span-3">
          <ul>
            <li>Продукция: </li>
            <li>Коллекция: </li>
          </ul>
        </div>
        <Link
          href="/admin/products"
          className="items-center  text-center rounded-md bg-neutral-300 py-4 flex flex-row gap-4 transition delay-150 duration-500 justify-center hover:bg-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
          Продукция
        </Link>
        <Link
          href="/admin/collections"
          className="items-center text-center rounded-md bg-neutral-300 py-4 flex flex-row gap-4 transition delay-150 duration-500 justify-center hover:bg-neutral-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125Z"
            />
          </svg>
          Коллекция
        </Link>
        <Link
          href="/admin/products/new"
          className="items-center text-center rounded-md bg-slate-300 py-4 flex flex-row gap-4 transition delay-150 duration-500 justify-center hover:bg-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Добавить продукцию
        </Link>
        <Link
          href="/admin/collections/new"
          className="items-center text-center rounded-md bg-slate-300 py-4 flex flex-row gap-4 transition delay-150 duration-500 justify-center hover:bg-slate-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Добавить коллекцию
        </Link>
      </div>
    </div>
  );
}

export default AdminPage;
