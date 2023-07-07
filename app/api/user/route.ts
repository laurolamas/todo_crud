import prisma from '@/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json({ error: 'No username provided' })
    }

    const deletedUser = await prisma.user.delete({
      where: {
        username: username,
      },
    })
    return NextResponse.json(deletedUser)
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.json({ error: 'Error deleting user' })
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.text()

  const body = JSON.parse(data)

  const updateUser = await prisma.user.update({
    where: {
      username: body.username,
    },
    data: {
      password: body.password,
    },
  })

  return NextResponse.json(updateUser)
}
