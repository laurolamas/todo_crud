import prisma from '@/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const userHeader = request.headers.get('userId')
  const userId = userHeader ? userHeader : '0'
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userId),
    },
  })
  const copyUser = { ...user }
  // Delete password field from user object
  delete copyUser.password
  return NextResponse.json(copyUser)
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
  const userHeader = request.headers.get('userId')
  const userId = userHeader ? userHeader : '0'

  if (parseInt(userId) !== body.id) {
    return NextResponse.json(
      { error: 'You can only update your own user' },
      { status: 401 }
    )
  }

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
