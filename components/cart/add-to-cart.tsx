"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
// import { addItem } from "components/cart/actions";
import LoadingDots from "components/loading-dots";
import { ProductOption } from "@/lib/types";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

function SubmitButton({
  availableForSale,
  selectedVariantId,
}: {
  availableForSale: boolean;
  selectedVariantId: string | undefined;
}) {
  const { pending } = useFormStatus();
  const buttonClasses =
    "relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white";
  const disabledClasses = "cursor-not-allowed opacity-60 hover:opacity-60";

  if (!availableForSale) {
    return (
      <button aria-disabled className={clsx(buttonClasses, disabledClasses)}>
        Нету в наличии
      </button>
    );
  }

  if (!selectedVariantId) {
    return (
      <button
        aria-label="Пожалуйста, выберите вариант"
        aria-disabled
        className={clsx(buttonClasses, disabledClasses)}
      >
        <div className="absolute left-0 ml-4">
          <PlusIcon className="h-5" />
        </div>
        Добавить в корзину
      </button>
    );
  }

  return (
    <button
      onClick={(e: React.FormEvent<HTMLButtonElement>) => {
        if (pending) e.preventDefault();
      }}
      aria-label="Add to cart"
      aria-disabled={pending}
      className={clsx(buttonClasses, {
        "hover:opacity-90": true,
        disabledClasses: pending,
      })}
    >
      <div className="absolute left-0 ml-4">
        {pending ? (
          <LoadingDots className="mb-3 bg-white" />
        ) : (
          <PlusIcon className="h-5" />
        )}
      </div>
      Добавить к корзине
    </button>
  );
}

export function AddToCart({
  variants,
  availableForSale,
}: {
  variants: ProductOption[];
  availableForSale: boolean;
}) {
  //   const [message, formAction] = useFormState("", null);
  const searchParams = useSearchParams();
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
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
    <form>
      <SubmitButton
        availableForSale={availableForSale}
        selectedVariantId={""}
      />
      <p aria-live="polite" className="sr-only" role="status">
        {/* {message} */}
      </p>
    </form>
  );
}
