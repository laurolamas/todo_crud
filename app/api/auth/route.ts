import prisma from '@/prisma/prisma'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
import { NextResponse } from 'next/server'

// Login route that creates token
export async function POST(request: Request) {
  const { username, password } = await request.json()
  const dbUser = await prisma.user.findUnique({
    where: { username },
  })

  console.log(dbUser)

  if (dbUser?.password !== password) {
    return new Response(JSON.stringify({ error: 'Failed to login' }), {
      status: 401,
    })
  }

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      data: { dbUser },
    },
    JSON.stringify(process.env.JWT_SECRET)
  )

  const serializedToken = serialize('userToken', token)

  const res = NextResponse.json({ 'message': 'success' }, { status: 200 })
  res.cookies.set('userToken', serializedToken)

  return res
}

// Logout route that deletes token
export async function DELETE(request: Request, response: NextResponse) {
  return response.cookies.set('userToken', '', {
    maxAge: 0,
    path: '/',
  })
}
