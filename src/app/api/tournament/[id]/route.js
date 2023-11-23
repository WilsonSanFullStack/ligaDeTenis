import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  try {
    const tournament = await prisma.tournament.findFirst({
      where: { id: params.id },
      include: { players: true },
    });
    return NextResponse.json(tournament);
  } catch (error) {
    return NextResponse.json("No fue posible" + error.message);
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json();

    // Validación de la solicitud
    if (!data.name || !data.description || !data.image) {
      return NextResponse.json({
        error: 'Falta información en la solicitud.',
      }, { status: 400 });
    }

    // Actualización del torneo
    const tournamentUpdate = await prisma.tournament.update({
      where: { id: params.id },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });

    // Respuesta exitosa
    return NextResponse.json(tournamentUpdate, { status: 200 });
  } catch (error) {
    // Manejo de errores
    console.error('Error al actualizar el torneo', error);
    return NextResponse.json({
      error: 'No fue posible actualizar el torneo.',
    }, { status: 500 });
  }
}


export async function DELETE(request, { params }) {
  try {
    const tournamentId = params.id;
    const tournamentDelete = await prisma.tournament.delete({
      where: { id: tournamentId },
    });
    return NextResponse.json(tournamentDelete, { status: 200 });
  } catch (error) {
    return NextResponse.json("No fue posible eliminar el torneo: " + error.message, { status: 500 });
  }
}
