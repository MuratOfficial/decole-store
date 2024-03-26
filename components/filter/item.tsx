"use client";

import { SortFilter } from "@/lib/constants";
import { Collection } from "@/lib/types";
import clsx from "clsx";
import { createUrl } from "lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function PathFilterItem({ item }: { item: Collection }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("id") === item?.id;
  const q = searchParams.get("q");
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item && { id: item.id }),
    })
  );
  const DynamicTag = active ? "p" : Link;

  return (
    <li className="mt-2 flex text-sm text-black dark:text-white" key={item?.id}>
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx("w-full hover:underline hover:underline-offset-4", {
          "underline underline-offset-4": active,
        })}
      >
        {item?.name}
      </DynamicTag>
    </li>
  );
}

function SortFilterItem({ item }: { item?: SortFilter }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item?.sort;
  const q = searchParams.get("q");
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item && { sort: item.sort }),
    })
  );
  const DynamicTag = active ? "p" : Link;

  return (
    <li
      className="mt-2 flex text-sm text-black dark:text-white"
      key={item?.sort}
    >
      <DynamicTag
        prefetch={!active ? false : undefined}
        href={href}
        className={clsx("w-full hover:underline hover:underline-offset-4", {
          "underline underline-offset-4": active,
        })}
      >
        {item?.name}
      </DynamicTag>
    </li>
  );
}

export function FilterItem({
  item,
  sortItem,
}: {
  item?: Collection;
  sortItem?: SortFilter;
}) {
  return item ? (
    <PathFilterItem item={item} />
  ) : (
    <SortFilterItem item={sortItem} />
  );
}
