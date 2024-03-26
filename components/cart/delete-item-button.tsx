"use client";

import useBaskets from "@/hooks/useBasket";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Image, Product } from "@prisma/client";
import clsx from "clsx";
import LoadingDots from "components/loading-dots";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton({ id }: { id: string }) {
  const deleteItem = useBaskets().removeItem;

  return (
    <button
      onClick={() => {
        deleteItem(id);
      }}
      aria-label="Remove cart item"
      className={clsx(
        "ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200"
      )}
    >
      <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
    </button>
  );
}

export function DeleteItemButton({
  item,
}: {
  item: Product & { images: Image[] };
}) {
  return (
    <div>
      <SubmitButton id={item.id} />
    </div>
  );
}
