import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request, { params }) {
  try {
    const user = await prisma.user.findUnique({
      where: { idClerk: params.id },
    });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json("No fue posible" + error.message);
  }
}
export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const userUpdate = await prisma.user.update({
      where: { idClerk: params.id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        image: data.image,
        email: data.email,
        phone: data.phone,
        gender: data.gender,
        admin: data.admin,
      },
    });
    return NextResponse.json(userUpdate);
  } catch (error) {
    return NextResponse.json("No fue posible" + error.message);
  }
}

export async function DELETE(request, { params }) {
  try {
    const userDelete = await prisma.user.delete({
      where: { idClerk: params.id },
    });
    return NextResponse.json("eliminando Usuario" + params.id);
  } catch (error) {
    return NextResponse.json("No fue posible" + error.message);
  }
}
