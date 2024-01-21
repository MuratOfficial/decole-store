import { Carousel } from "@/components/carousel";
import { ThreeItemGrid } from "@/components/grid/three-items-grid";
import Footer from "@/components/layouts/footer";
import prismadb from "@/lib/prismadb";

export const metadata = {
  title: "De Cole | Магазин бижутерии De Cole",
  description:
    "Магазин бижутерии De Cole в г. Шымкент. В ассортименте имеются все виды поделок, инструментов и ручных изделии",
  openGraph: {
    type: "website",
  },
};

export default async function HomePage() {
  const products = await prismadb.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: true,
    },
  });

  return (
    <>
      <ThreeItemGrid data={products} />
      <Carousel data={products} />
      <Footer />
    </>
  );
}
