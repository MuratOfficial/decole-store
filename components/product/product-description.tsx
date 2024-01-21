import Price from "components/price";
import Prose from "../prose";
import { AddToCart } from "../cart/add-to-cart";
import { VariantSelector } from "./variant-selector";
import { Product } from "@prisma/client";

export function ProductDescription({ product }: { product: Product }) {
  const colors = [product.color1, product.color2, product.color3];

  const variants = [product.option1, product.option2, product.option3];
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={product.price} currencyCode="KZT" />
        </div>
      </div>
      <VariantSelector options={colors} variants={variants} />

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}

      <AddToCart
        variants={variants}
        availableForSale={product.availableForSale}
      />
    </>
  );
}
