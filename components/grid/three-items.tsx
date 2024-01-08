import { fakeProducts } from "@/lib/fakeData";
import { GridTileImage } from "./tile";
// import { getCollectionProducts } from "lib/shopware";
// import { isSeoUrls } from "lib/shopware/helpers";
import type { Money, Product } from "@/lib/types";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.path}`}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

// Generate a random product

// Generate an array of 3 random products

export function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // //   const collectionName = isSeoUrls()
  // //     ? "Summer-BBQ/Hidden-Category"
  // //     : "4ab73c06d90d4a5cb312209a64480d87";
  //   const { products: homepageItems } = await getCollectionProducts({
  //     collection: collectionName,
  //   });

  const arrayOfRandomProducts: Product[] = fakeProducts;

  if (
    !arrayOfRandomProducts[0] ||
    !arrayOfRandomProducts[1] ||
    !arrayOfRandomProducts[2]
  )
    return null;

  const [firstProduct, secondProduct, thirdProduct] = arrayOfRandomProducts;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
