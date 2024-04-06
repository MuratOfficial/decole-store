import { NextResponse } from "next/server";

import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      username,
      phone,

      email,
      password,
    } = body;

    const hashedPassword = await hash(password, 12);

    const users = await prismadb.user.create({
      data: {
        username,
        phone,

        email,
        passwordHash: hashedPassword,
        password,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
