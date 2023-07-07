import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

function verifyCookie(request: NextRequest) {
  const userToken = request.cookies.get('userToken')
  if (!userToken || userToken.value === '') {
    return false
  }
  /* const userTokenValue = userToken.value.split('=')[1]
  const decoded: any = jwt.verify(
    userTokenValue,
    JSON.stringify(process.env.JWT_SECRET)
  )
  // Chequear que token es valido
  const user = decoded.data.dbUser */
  return true
}

function handleLogin(request: NextRequest) {
  if (verifyCookie(request)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}

function handleHome(request: NextRequest) {
  if (!verifyCookie(request)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

function handlePrivateApi(request: NextRequest) {
  if (!verifyCookie(request)) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 401 })
  }
  return NextResponse.next()
}

function handlePublicApi(request: NextRequest) {
  return NextResponse.next()
}

const publicRoutes = ['/api/auth', '/api/user/create']

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log('middleware for route:', path)
  if (path === '/login') {
    console.log('login')
    return handleLogin(request)
  }
  if (path === '/') {
    console.log('/home')
    return handleHome(request)
  }
  if (path === '/api/user/create' || path === '/api/auth') {
    console.log('api public')
    return handlePublicApi(request)
  }
  if (path.startsWith('/api/todo') || path.startsWith('/api/user')) {
    console.log('api private')
    return handlePrivateApi(request)
  }
  console.log('other')
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
