import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

interface User {
  id: number
  username: string
  password: string
}

async function authUser(request: NextRequest) {
  const userToken = request.cookies.get('userToken')
  if (!userToken || userToken.value === '') {
    return false
  }

  const userTokenValue = userToken.value
  const secret = jose.base64url.decode(
    'zH4NRP1HMALxxCFnRZABFA7GOJtzUa43lauro67891a'
  )
  try {
    const { protectedHeader, payload } = await jose.jwtDecrypt(
      userTokenValue,
      secret,
      {
        issuer: 'urn:example:issuer',
        audience: 'urn:example:audience',
      }
    )
    return payload.dbUser as User
  } catch (err) {
    console.log(err)
    return false
  }
}

function addIdHeader(request: Request, id: string) {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('userId', id)
  // You can also set request headers in NextResponse.rewrite
  const response = NextResponse.next({
    request: {
      // New request headers
      headers: requestHeaders,
    },
  })
  return response
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  // Getting the user from the token or flase if not logged in
  const user = await authUser(request)
  const path = request.nextUrl.pathname
  if (path === '/login') {
    if (user !== false) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }
  if (path === '/') {
    if (user === false) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
  }
  if (path === '/api/user/create' || path === '/api/auth') {
    return NextResponse.next()
  }
  if (path.startsWith('/api/todo') || path.startsWith('/api/user')) {
    if (user === false) {
      return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
    }
    return addIdHeader(request, user.id.toString())
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  matcher: [
    '/',
    '/api/:path',
    '/login',
    '/api/auth',
    '/api/user/create',
    '/api/todo/:path*',
    '/api/user/:path*',
  ],
}
