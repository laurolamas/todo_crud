import { NextResponse } from "next/server"


export async function POST(request: Request, response : NextResponse) {
    const res = NextResponse.redirect('http://localhost:3000/login', { status: 302 })
    res.cookies.set('userToken', '')
    return res
    }
