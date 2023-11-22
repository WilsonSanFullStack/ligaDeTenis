import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET() {
  const tournaments = await prisma.tournament.findMany();
  return NextResponse.json(tournaments);
}

export async function PUT(request) {
  try {
    const data = await request.json();
    const userId = data.userId;
    const tournamentId = data.tournamentId;
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    const existingTournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
    });
    if (existingUser && existingTournament) {
      console.log("entro en el if");
      const updateTournament = await prisma.tournament.update({
        where: { id: tournamentId },
        data: {
          players: {
            connectOrCreate: {
              where: {
                id: existingUser.id,  // Proporciona el id para PlayerWhereUniqueInput
              },
              create: {
                userId: existingUser.id,
                // tournamentId: tournamentId,
              },
            },
          },
        },
      });
      console.log(updateTournament);
      return NextResponse.json(updateTournament);
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No se pudo: " + error.message });
  }
}
