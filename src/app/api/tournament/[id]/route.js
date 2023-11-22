import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  try {
    console.log('geto')
    console.log(params.id)
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
    const tournamentUpdate = await prisma.tournament.update({
      where: { id: Number(params.id) },
      data: {
        name: data.name,
        description: data.description,
        image: data.image,
      },
    });
    return NextResponse.json(tournamentUpdate);
  } catch (error) {
    return NextResponse.json("No fue posible" + error.message);
  }
}

export async function DELETE(request, { params }) {
  try {
    const tournamentDelete = await prisma.tournament.delete({
      where: { id: Number(params.id) },
    });
    return NextResponse.json("eliminando Usuario" + params.id);
  } catch (error) {
    return NextResponse.json("No fue posible" + error.message);
  }
}
