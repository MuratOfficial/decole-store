"use client";

import clsx from "clsx";
import { createUrl } from "lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Combination = {
  id: string;
  availableForSale: boolean;
  [key: string]: string | boolean; // ie. { color: 'Red', size: 'Large', ... }
};

export function VariantSelector({
  options,
  variants,
}: {
  options: string[];
  variants: string[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasNoOptionsOrJustOneOption =
    !options.length || (options.length === 1 && options[0]?.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations: Combination[] = variants.map((variant) => ({
    id: variant,
    availableForSale: true,
  }));

  return (
    <>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">Размер</dt>
        <dd className="flex flex-wrap gap-3">
          {variants.map((value) => {
            const optionNameLowerCase = value.toLowerCase();

            // Base option params on current params so we can preserve any other param state in the url.
            const optionSearchParams = new URLSearchParams(
              searchParams.toString()
            );

            // Update the option params using the current option to reflect how the url *would* change,
            // if the option was clicked.
            optionSearchParams.set(optionNameLowerCase, value);
            const optionUrl = createUrl(pathname, optionSearchParams);
            const filtered = Array.from(optionSearchParams.entries()).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.toLowerCase() === key && option.includes(value)
                )
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale
              )
            );

            // The option is active if it's in the url params.
            const isActive = searchParams.get(optionNameLowerCase) === value;

            return (
              <button
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                onClick={() => {
                  router.replace(optionUrl, { scroll: false });
                }}
                title={`${value} ${value}${
                  !isAvailableForSale ? " (Нету в наличии)" : ""
                }`}
                className={clsx(
                  "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                  {
                    "cursor-default ring-2 ring-blue-600": isActive,
                    "ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ":
                      !isActive && isAvailableForSale,
                    "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700":
                      !isAvailableForSale,
                  }
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
      <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">Цвет</dt>
        <dd className="flex flex-wrap gap-3">
          {options.map((value) => {
            const optionNameLowerCase = value.toLowerCase();

            // Base option params on current params so we can preserve any other param state in the url.
            const optionSearchParams = new URLSearchParams(
              searchParams.toString()
            );

            // Update the option params using the current option to reflect how the url *would* change,
            // if the option was clicked.
            optionSearchParams.set(optionNameLowerCase, value);
            const optionUrl = createUrl(pathname, optionSearchParams);
            const filtered = Array.from(optionSearchParams.entries()).filter(
              ([key, value]) =>
                options.find(
                  (option) =>
                    option.toLowerCase() === key && option.includes(value)
                )
            );
            const isAvailableForSale = combinations.find((combination) =>
              filtered.every(
                ([key, value]) =>
                  combination[key] === value && combination.availableForSale
              )
            );

            // The option is active if it's in the url params.
            const isActive = searchParams.get(optionNameLowerCase) === value;

            return (
              <button
                key={value}
                aria-disabled={!isAvailableForSale}
                disabled={!isAvailableForSale}
                onClick={() => {
                  router.replace(optionUrl, { scroll: false });
                }}
                title={`${value} ${value}${
                  !isAvailableForSale ? " (Нету в наличии)" : ""
                }`}
                className={clsx(
                  "flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900",
                  {
                    "cursor-default ring-2 ring-blue-600": isActive,
                    "ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ":
                      !isActive && isAvailableForSale,
                    "relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700":
                      !isAvailableForSale,
                  }
                )}
              >
                {value}
              </button>
            );
          })}
        </dd>
      </dl>
    </>
  );
}
