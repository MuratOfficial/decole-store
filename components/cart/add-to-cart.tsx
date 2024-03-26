"use client";

import useBaskets from "@/hooks/useBasket";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Image, Product } from "@prisma/client";
import clsx from "clsx";
// import { addItem } from "components/cart/actions";

function SubmitButton({
  availableForSale,
  product,
}: {
  availableForSale: boolean;
  product: Product & { images: Image[] };
}) {
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses)}>
        Нету в наличии
      </button>
    );
  }

  // if (!selectedVariantId) {
  //   return (
  //     <button
  //       aria-label="Пожалуйста, выберите вариант"
  //       className={clsx(buttonClasses)}
  //     >
  //       <div className="absolute left-0 ml-4">
  //         <PlusIcon className="h-5" />
  //       </div>
  //       Добавить в корзину
  //     </button>
  //   );
  // }

  const addToBasket = useBaskets().addToBasket;

  return (
    <button
      onClick={() => addToBasket(product)}
      aria-label="Add to cart"
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      Добавить к корзине
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
  product,
}: {
  variants: string[];
  availableForSale: boolean;
  product: Product & { images: Image[] };
}) {
  //   const [message, formAction] = useFormState("", null);

  //   const defaultProductId =
  //     variants.length === 1 ? variants[0]?.parentId : undefined;
  //   const variant = variants.find((variant: ProductOption) =>
  //     variant.selectedOptions.every(
  //       (option) => option.value === searchParams.get(option.name.toLowerCase())
  //     )
  //   );
  //   const selectedVariantId = variant?.id || defaultVariantId;
  // //   const selectedProductId = variant?.parentId || defaultProductId;
  //   const actionWithVariant = formAction.bind(null, {
  //     selectedProductId,
  //     selectedVariantId,
  //   });

  return (
    <div>
      <SubmitButton availableForSale={availableForSale} product={product} />
      <p aria-live="polite" className="sr-only" role="status">
        {/* {message} */}
      </p>
    </div>
  );
}
