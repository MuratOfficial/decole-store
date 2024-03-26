import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { GridTileImage } from "components/grid/tile";
import Footer from "@/components/layouts/footer";
import { Gallery } from "components/product/gallery";
import Link from "next/link";
import fakeProducts from "@/lib/fake-products";
import { ProductDescription } from "@/components/product/product-description";
import prismadb from "@/lib/prismadb";
import { Image } from "@prisma/client";

export async function generateMetadata({
  params,
}: {
  params: { productId: string };
}): Promise<Metadata> {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  return {
    title: `${product?.title}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  if (!product) return notFound();

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Suspense>
              <Gallery
                images={product.images.map((image: Image) => ({
                  src: image.url,
                  altText: image.id,
                }))}
              />
            </Suspense>
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts name={product.title.slice(0, 4)} />
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
  );
}

function RelatedProducts({ name }: { name: string }) {
  const relatedProducts = fakeProducts.filter((item) =>
    item.title.toLocaleLowerCase().includes(name.toLocaleLowerCase())
  );

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Похожие товары</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.id}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link className="relative h-full w-full" href={`${product.id}`}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.price,
                  currencyCode: "KZT",
                }}
                src={product.images[0]?.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
