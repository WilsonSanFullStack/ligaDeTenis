import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const useres = await prisma.user.findMany();
  return NextResponse.json(useres);
}

export async function POST(request) {
  try {
    const data = await request.json();
console.log(data)
    const newUser = await prisma.User.create({
      firstName: '',
      lastName: '',
      image: '',
      email: '',
      phone: '',
      gender: '',
      admin: '',
      clerk: '',
    });
    return NextResponse.json(newUser);
  } catch (error) {
    return NextResponse.json({ message: "no se pudo" + error.message });
  }
}

// npx prisma studio  //*para ejecutar el prima
