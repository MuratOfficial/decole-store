import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function GET(
  req: Request,
  { params }: { params: { collectionId: string } }
) {
  try {
    if (!params.collectionId) {
      return new NextResponse("Collection id is required", { status: 400 });
    }

    const collection = await prismadb.collection.findUnique({
      where: {
        id: params.collectionId,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("[collection_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { collectionId: string } }
) {
  try {
    if (!params.collectionId) {
      return new NextResponse("Collection id is required", { status: 400 });
    }

    const collection = await prismadb.collection.delete({
      where: {
        id: params.collectionId,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("[collection_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { collectionId: string } }
) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.collectionId) {
      return new NextResponse("Collection id is required", { status: 400 });
    }

    const collection = await prismadb.collection.update({
      where: {
        id: params.collectionId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("[collection_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
