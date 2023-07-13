import prisma from '@/prisma/prisma'
import * as jose from 'jose'
import { NextResponse } from 'next/server'

// Login route that creates token
export async function POST(request: Request) {
  const { username, password } = await request.json()
  const dbUser = await prisma.user.findUnique({
    where: { username },
  })

  if (dbUser?.password !== password) {
    return new Response(JSON.stringify({ error: 'Failed to login' }), {
      status: 401,
    })
  }
  const secret = jose.base64url.decode(
    'zH4NRP1HMALxxCFnRZABFA7GOJtzUa43lauro67891a'
  )

  const jwt = await new jose.EncryptJWT({ 'dbUser': dbUser })
    .setProtectedHeader({ alg: 'dir', enc: 'A128CBC-HS256' })
    .setIssuedAt()
    .setIssuer('urn:example:issuer')
    .setAudience('urn:example:audience')
    .setExpirationTime('2h')
    .encrypt(secret)

  const res = NextResponse.json({ 'message': 'success' }, { status: 200 })
  res.cookies.set('userToken', jwt)

  return res
}

// Logout route that deletes token
export async function DELETE(request: Request) {
  const response = NextResponse.json(
    { 'message': 'logged out' },
    { status: 200 }
  )
  response.cookies.set('userToken', '', {
    maxAge: 0,
    path: '/',
  })
  return response
}
