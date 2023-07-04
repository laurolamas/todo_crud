import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  const users = await prisma.User.findMany();
  return NextResponse.json(users);
}

export async function POST(request) {
  const data = await request.text();
  const body = JSON.parse(data);

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  });
  return NextResponse.json(newUser);
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);

    const username = searchParams.get("username");

    const deletedUser = await prisma.user.delete({
      where: {
        username: username,
      },
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.error("Error deleting user");
  }
}

export async function PUT(request) {
  const data = await request.text();

  const body = JSON.parse(data);

  const updateUser = await prisma.user.update({
    where: {
      username: body.username,
    },
    data: {
      password: body.password,
    },
  });

  return NextResponse.json(updateUser);
}
