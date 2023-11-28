import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const useres = await prisma.user.findMany();

  return NextResponse.json(useres);
}

export async function POST(request) {
  try {
    const data = await request.json();
    if (data.email === "harveysanch@gmail.com") {
      data.admin = true;
    }
    const newUser = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        admin: data.admin,
        clerk: data.idClerk,
      },
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ message: "no se pudo" + error.message });
  }
}

// npx prisma studio  //*para ejecutar el prima
