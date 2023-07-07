import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/prisma/prisma'

export async function POST(request: NextRequest) {
  const data = await request.text()
  const body = JSON.parse(data)

  const newUser = await prisma.user.create({
    data: {
      username: body.username,
      password: body.password,
    },
  })
  return NextResponse.json(newUser)
}
