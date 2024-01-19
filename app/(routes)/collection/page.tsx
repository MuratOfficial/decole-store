import Grid from "components/grid";
import ProductGridItems from "@/components/layouts/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import fakeProducts from "@/lib/fake-products";

export const metadata = {
  title: "Продукция",
  description: "Поиск продукции в коллекции De'Cole",
};

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const { sort, q: searchValue } = searchParams as { [key: string]: string };
  const { id } = sorting.find((item) => item.id === sort) || defaultSort;

  const products = fakeProducts;
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? "Совпадении не найдено "
            : `Показаны ${products.length} ${resultsText} по `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
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
