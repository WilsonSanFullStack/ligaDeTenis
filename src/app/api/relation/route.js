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
      return NextResponse.json(updateTournament);
    }
  } catch (error) {
    return NextResponse.json({ message: "No se pudo: " + error.message });
  }
}

export async function DELETE(request) {
  try {
    const data = await request.json();
    console.log('first')
    console.log(data)
    const userId = data.userId;
    const tournamentId = data.tournamentId;
    const playerId = data.playerId;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    const existingTournament = await prisma.tournament.findUnique({
      where: { id: tournamentId },
    });

    if (existingUser && existingTournament) {
      const existingPlayer = await prisma.player.findUnique({
        where: {
          id: playerId,
        },
      });
      

      if (existingPlayer) {
        const deletePlayer = await prisma.player.delete({
          where: {
            id: existingPlayer.id,
          },
        });
        return NextResponse.json(deletePlayer);
      } else {
        return NextResponse.json({ message: "No se encontró el jugador para eliminar." });
      }
    } else {
      return NextResponse.json({ message: "No se encontró el usuario o el torneo." });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "No se pudo: " + error.message });
  }
}
