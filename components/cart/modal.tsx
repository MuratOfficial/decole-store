"use client";

import dynamic from "next/dynamic";

const OpenCart = dynamic(() => import("./open-cart"), { ssr: false });
import { Dialog, Transition } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Price from "components/price";
import { createUrl } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useRef, useState } from "react";
import CloseCart from "./close-cart";
import { DeleteItemButton } from "./delete-item-button";
import { EditItemQuantityButton } from "./edit-item-quantity-button";
import { Product } from "@prisma/client";
import CleanAll from "./clean-all";
import useBaskets from "@/hooks/useBasket";

type MerchandiseSearchParams = {
  [key: string]: string;
};

type TypeImage = {
  id: string;
  productId: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
};

interface CartModalProps {
  cost: number;
  lines: (Product & { images: TypeImage[] })[];
  totalQuantity: number;
}

export default function CartModal({
  cost,
  lines,
  totalQuantity,
}: CartModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(totalQuantity);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const quantity = useBaskets().getItemCount;
  const totalSum = useBaskets().getTotalBasketPrice();
  const costOfItem = useBaskets().getTotalPrice;

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (totalQuantity !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = totalQuantity;
    }
  }, [isOpen, totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={totalQuantity} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Корзина</p>
                <CleanAll />

                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {lines.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">
                    Ваша корзина пуста.
                  </p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {lines.map((item, i) => {
                      const merchandiseSearchParams =
                        {} as MerchandiseSearchParams;
                      let subTitleWithSelectedOptions = "";

                      //   item.forEach(
                      //     ({ name, value }) => {
                      //       subTitleWithSelectedOptions += `${name}: ${value} `;
                      //       if (value !== DEFAULT_OPTION) {
                      //         merchandiseSearchParams[name.toLowerCase()] = value;
                      //       }
                      //     }
                      //   );

                      const merchandiseUrl = createUrl(
                        item.id,
                        new URLSearchParams(merchandiseSearchParams)
                      );

                      return (
                        <li
                          key={i}
                          className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              <DeleteItemButton item={item} />
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 flex flex-row space-x-4"
                            >
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={item.color1 || item.title}
                                  src={
                                    (item?.images && item?.images[0]?.url) || ""
                                  }
                                />
                              </div>

                              <div className="flex flex-1 flex-col text-base">
                                <span className="leading-tight">
                                  {item.title}
                                </span>
                              </div>
                            </Link>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                amount={costOfItem()[item.id].toString()}
                                currencyCode="KZT"
                              />
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                <EditItemQuantityButton
                                  item={item}
                                  type="minus"
                                />
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">
                                    {quantity(item.id)}
                                  </span>
                                </p>
                                <EditItemQuantityButton
                                  item={item}
                                  type="plus"
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>В сумме</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        amount={totalSum.toString()}
                        currencyCode="KZT"
                      />
                    </div>
                  </div>
                  <a
                    href="/"
                    className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Перейти к форме отправки
                  </a>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
