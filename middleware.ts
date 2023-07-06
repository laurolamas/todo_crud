import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { authUser } from '@/app/lib/auth'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const res = await authUser(request)

    if (!res.ok) {
        console.log('not ok')
        return NextResponse.redirect(new URL('/login', request.url))
    }
  console.log('Middleware ok')  
  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
 // matcher: '/about/:path*',
 matcher : '/'
}
