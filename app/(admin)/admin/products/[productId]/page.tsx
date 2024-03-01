import React from "react";
import { ProductForm } from "./components/product-form";
import prismadb from "@/lib/prismadb";

async function ProductPageAdd({
  params,
}: {
  params: {
    productId: string;
  };
}) {
  let product;

  if (params.productId === "new") {
    product = null;
  } else {
    product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
      },
    });
  }

  const collections = await prismadb.collection.findMany({});

  return (
    <div className="w-full py-4 px-6 items-center flex flex-col">
      <ProductForm initialData={product} collections={collections} />
    </div>
  );
}

export default ProductPageAdd;
