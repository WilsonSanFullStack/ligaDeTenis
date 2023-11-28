import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  try {
    const user = await prisma.user.findFirstOrThrow({
      where: { clerk: params.id },
      // include: { players: true },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json("No fue posible" + error.message);
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    // Validar que se proporcionaron datos importantes
    if (!data || !data.firstName) {
      return NextResponse.json({ error: "Datos incompletos para la actualización." });
    }

    const userUpdate = await prisma.user.update({
      where: { id: params.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        admin: JSON.parse(data.admin),
      },
    });

    return NextResponse.json(userUpdate);
  } catch (error) {
    return NextResponse.json({ error: "Error al actualizar el usuario", details: error.message });
  }
}


export async function DELETE(request, { params }) {
  try {
    const userDelete = await prisma.user.delete({
      where: { id: params.id },
    });
    return NextResponse.json("eliminando Usuario" + userDelete.firstName);
  } catch (error) {
    return NextResponse.json({ error: `No fue posible eliminar el usuario: ${error.message}` });

  }
}
