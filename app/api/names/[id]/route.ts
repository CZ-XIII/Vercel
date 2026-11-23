import { NextResponse } from "next/server";
import prisma from "../../../../src/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedName = await prisma.name.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(updatedName);
  } catch {
    return NextResponse.json(
      { message: "Gagal mengubah data" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.name.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      message: "Data berhasil dihapus",
    });
  } catch {
    return NextResponse.json(
      { message: "Gagal menghapus data" },
      { status: 500 }
    );
  }
}