import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const collection = await prismadb.collection.create({
      data: {
        name,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.log("[COLLECTIONS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const collections = await prismadb.collection.findMany({});

    return NextResponse.json(collections);
  } catch (error) {
    console.log("[COLLECTIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
