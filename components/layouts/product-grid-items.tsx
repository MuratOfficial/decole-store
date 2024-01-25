import { Image, Product } from "@prisma/client";
import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import Link from "next/link";

export default function ProductGridItems({
  products,
}: {
  products: (Product & {
    images: Image[];
  })[];
}) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link
            className="relative inline-block h-full w-full"
            href={`${product.id}`}
          >
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.price,
                currencyCode: "KZT",
              }}
              src={product.images[0]?.url}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
