import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function authUser(request: NextRequest) {
  const userToken = request.cookies.get('userToken')
  console.log(`userToken.value= "${userToken?.value}"`)
  if (!userToken || userToken.value === '') {
    // Add redirect to login page
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const userTokenValue = userToken.value.split('=')[1]
  const decoded: any = jwt.verify(
    userTokenValue,
    JSON.stringify(process.env.JWT_SECRET)
  )
  const user = decoded.data.dbUser
  return NextResponse.json(user)
}
