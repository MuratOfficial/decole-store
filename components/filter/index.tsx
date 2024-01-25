import { Collection } from "@prisma/client";
import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";
import { Suspense } from "react";

function FilterItemList({ list }: { list: Collection[] }) {
  return (
    <>
      <Suspense>
        {list.map((item: Collection, i) => (
          <FilterItem key={i} item={item} />
        ))}
      </Suspense>
    </>
  );
}

export default function FilterList({
  list,
  title,
}: {
  list: Collection[];
  title?: string;
}) {
  return (
    <>
      <nav>
        <Suspense>
          {title ? (
            <h3 className="hidden text-xs text-neutral-500 dark:text-neutral-400 md:block">
              {title}
            </h3>
          ) : null}
          <ul className="hidden md:block">
            <FilterItemList list={list} />
          </ul>
          <ul className="md:hidden">
            <FilterItemDropdown list={list} />
          </ul>
        </Suspense>
      </nav>
    </>
  );
}
