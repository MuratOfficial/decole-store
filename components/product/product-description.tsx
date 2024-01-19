import Price from "components/price";
import { Product } from "@/lib/types";
import Prose from "../prose";
import { AddToCart } from "../cart/add-to-cart";
import { VariantSelector } from "./variant-selector";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={product.price} currencyCode="KZT" />
        </div>
      </div>
      <VariantSelector options={product.colors} variants={product.options} />

      {product.description ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}

      <AddToCart
        variants={product.options}
        availableForSale={product.availableForSale}
      />
    </>
  );
}
