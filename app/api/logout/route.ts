import { NextResponse } from "next/server"


export async function POST(request: Request, response : NextResponse) {
    return response.cookies.set('userToken', '')
    }
