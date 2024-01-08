import { Carousel } from "@/components/carousel";
import { ThreeItemGrid } from "@/components/grid/three-items";
import Footer from "@/components/layout/footer";
// export const runtime = "edge";

export const metadata = {
  description:
    "Магазин бижутерии De Cole в г. Шымкент. В ассортименте имеются все виды поделок, инструментов и ручных изделии",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <ThreeItemGrid />
      {/* <Suspense> */}
      <Carousel />
      {/* <Suspense> */}
      <Footer />
      {/* </Suspense> */}
      {/* </Suspense> */}
    </>
  );
}
