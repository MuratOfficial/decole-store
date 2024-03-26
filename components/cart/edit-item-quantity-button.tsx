"use client";

import useBaskets from "@/hooks/useBasket";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Image, Product } from "@prisma/client";
import clsx from "clsx";

function SubmitButton({
  type,
  item,
}: {
  type: "plus" | "minus";
  item: Product & { images: Image[] };
}) {
  const addToBasket = useBaskets().addToBasket;
  const decreaseBasket = useBaskets().decreaseCount;

  return (
    <>
      {type === "plus" ? (
        <button
          type="submit"
          onClick={() => addToBasket(item)}
          aria-label={"Увеличьте количество"}
          className={clsx(
            "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
          )}
        >
          <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
        </button>
      ) : (
        <button
          type="submit"
          onClick={() => decreaseBasket(item.id)}
          aria-label={"Уменьшите количество"}
          className={clsx(
            "ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80"
          )}
        >
          <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
        </button>
      )}
    </>
  );
}

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: Product & { images: Image[] };
  type: "plus" | "minus";
}) {
  return (
    <div>
      <SubmitButton type={type} item={item} />
    </div>
  );
}
