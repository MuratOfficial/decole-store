import Grid from "components/grid";
import ProductGridItems from "@/components/layouts/product-grid-items";
import prismadb from "@/lib/prismadb";

export const metadata = {
  title: "Продукция",
  description: "Поиск продукции в коллекции FURNITURA LUX KAMNI",
};

// Define constants for pagination
const ITEMS_PER_PAGE = 12;

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined;
    query?: string;
    page?: string;
    sort?: string;
    id?: string;
  };
}) {
  const {
    sort = "desc",
    id,
    query = "",
    page = "1",
  } = searchParams as { [key: string]: string };

  const currentPage = parseInt(page, 10) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // Fetch total number of products for pagination
  const totalProducts =
    id !== ""
      ? await prismadb.product.count({
          where: {
            collectionId: id,
            title: {
              contains: query,
            },
          },
        })
      : await prismadb.product.count({
          where: {
            title: {
              contains: query,
            },
          },
        });

  // Fetch paginated products
  const products =
    id !== ""
      ? await prismadb.product.findMany({
          skip: skip,
          take: ITEMS_PER_PAGE,
          orderBy: [
            {
              createdAt: sort === "data" ? "asc" : "desc",
            },
          ],
          include: {
            images: true,
          },
          where: {
            collectionId: id,
            title: {
              contains: query,
            },
          },
        })
      : await prismadb.product.findMany({
          skip: skip,
          take: ITEMS_PER_PAGE,
          orderBy: [
            {
              createdAt: sort === "data" ? "asc" : "desc",
            },
          ],
          include: {
            images: true,
          },
          where: {
            title: {
              contains: query,
            },
          },
        });

  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);
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

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-between mt-4">
          {currentPage > 1 && (
            <a
              href={`?query=${query}&page=${currentPage - 1}&sort=${sort}&id=${
                id ? id : ""
              }`}
              className="hover:underline underline-offset-4 "
            >
              Пред.
            </a>
          )}
          {currentPage < totalPages && (
            <a
              href={`?query=${query}&page=${currentPage + 1}&sort=${sort}&id=${
                id ? id : ""
              }`}
              className="hover:underline underline-offset-4 "
            >
              След.
            </a>
          )}
        </div>
      )}
    </>
  );
}
