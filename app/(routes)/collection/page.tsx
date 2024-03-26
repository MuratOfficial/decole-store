import Grid from "components/grid";
import ProductGridItems from "@/components/layouts/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import prismadb from "@/lib/prismadb";

export const metadata = {
  title: "Продукция",
  description: "Поиск продукции в коллекции FURNITURA LUX KAMNI",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
    query: string | undefined;
  };
}) {
  const { sort, id, query } = searchParams as { [key: string]: string };

  const products = await prismadb.product.findMany({
    orderBy: [
      {
        createdAt: sort === "data" ? "asc" : "desc",
      },
    ],
    include: {
      images: true,
    },
    where: {
      collectionId: {
        contains: id,
      },

      title: {
        contains: query,
      },
    },
  });
  const resultsText = products.length > 1 ? "результаты" : "результат";

  return (
    <>
      {query ? (
        <p className="mb-4">
          {products.length === 0
            ? "Совпадении не найдено "
            : `Показаны ${products.length} ${resultsText} по `}
          <span className="font-bold">&quot;{query}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
