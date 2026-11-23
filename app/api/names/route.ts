import { NextResponse } from "next/server";
import prisma from "../../../src/lib/prisma";

export async function GET() {
  try {
    const names = await prisma.name.findMany();
    return NextResponse.json(names);
  } catch (error) {
    console.error("ERROR GET NAMES:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newName = await prisma.name.create({
      data: {
        name: body.name,
      },
    });

    return NextResponse.json(newName);
  } catch {
    return NextResponse.json(
      { message: "Gagal menambahkan data" },
      { status: 500 }
    );
  }
}