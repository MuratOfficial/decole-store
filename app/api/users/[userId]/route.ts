import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId) {
      return new NextResponse("user id is required", { status: 400 });
    }

    const user = await prismadb.user.delete({
      where: {
        id: params.userId,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[user_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const body = await req.json();

    const {
      username,
      phone,

      email,
      password,
    } = body;

    if (!params.userId) {
      return new NextResponse("user id is required", { status: 400 });
    }

    const hashedPassword = await hash(password, 12);

    const user = await prismadb.user.update({
      where: {
        id: params.userId,
      },
      data: {
        username,
        phone,

        email,
        password,
        passwordHash: hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[user_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
