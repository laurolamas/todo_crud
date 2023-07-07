import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const userToken = request.cookies.get('userToken')
  if (!userToken || userToken.value === '') {
    // Redirect to login page
    if (request.nextUrl.pathname.startsWith('/api/')) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } else {
    if (request.nextUrl.pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  const userTokenValue = userToken.value.split('=')[1]
  const decoded: any = jwt.verify(
    userTokenValue,
    JSON.stringify(process.env.JWT_SECRET)
  )
  const user = decoded.data.dbUser
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: '/about/:path*',
  matcher: '/',
}
