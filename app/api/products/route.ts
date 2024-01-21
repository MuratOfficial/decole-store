import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      title,
      images,

      availableForSale,
      description,
      option1,
      option2,
      option3,
      price,
      color1,
      color2,
      color3,
      collectionId,
      tags,
    } = body;

    const product = await prismadb.product.create({
      data: {
        title,
        availableForSale,
        description,
        option1,
        option2,
        option3,
        price,
        color1,
        color2,
        color3,
        collectionId,
        tags,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCTS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const products = await prismadb.product.findMany({
      include: {
        images: true,
        collection: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log("[PRODUCTS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
