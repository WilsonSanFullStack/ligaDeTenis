import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const tournaments = await prisma.tournament.findMany();
  return NextResponse.json(tournaments);
}

export async function POST(request) {
  try {
    const data = await request.json();
    const newTournament = await prisma.tournament.create({
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
    return NextResponse.json(newTournament);
  } catch (error) {
    return NextResponse.json({ message: "no se pudo" + error.message });
  }
}

// npx prisma studio  //*para ejecutar el prima
