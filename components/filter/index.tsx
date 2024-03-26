import { Collection } from "@prisma/client";
import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";
import { Suspense } from "react";
import { SortFilter } from "@/lib/constants";

function FilterItemList({
  list,
  sortList,
}: {
  list?: Collection[];
  sortList?: SortFilter[];
}) {
  return (
    <>
      <Suspense>
        {list &&
          list.map((item: Collection, i) => <FilterItem key={i} item={item} />)}
        {sortList &&
          sortList.map((item: SortFilter, i) => (
            <FilterItem key={i} sortItem={item} />
          ))}
      </Suspense>
    </>
  );
}

export default function FilterList({
  list,
  stringList,
  title,
}: {
  list?: Collection[];
  title?: string;
  stringList?: SortFilter[];
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
            <FilterItemList list={list} sortList={stringList} />
          </ul>
          <ul className="md:hidden">
            <FilterItemDropdown list={list || []} />
          </ul>
        </Suspense>
      </nav>
    </>
  );
}
