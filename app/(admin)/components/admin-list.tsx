import { Collection } from "@/lib/types";
import Link from "next/link";

function AdminItemList({ list }: { list: Collection[] }) {
  return (
    <>
      {list.map((item: Collection, i) => (
        <li
          className="mt-2 flex text-sm text-black dark:text-white text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100"
          key={item.name}
        >
          <Link href={item.id}>{item.name}</Link>
        </li>
      ))}
    </>
  );
}

export default function AdminList({
  list,
  title,
}: {
  list: Collection[];
  title?: string;
}) {
  return (
    <>
      <nav>
        {title ? (
          <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
            {title}
          </h3>
        ) : null}
        <ul className="hidden md:block">
          <AdminItemList list={list} />
        </ul>
      </nav>
    </>
  );
}
