import prisma from '@/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { authUser } from '@/app/lib/auth'

export async function GET(request: NextRequest) {
  const res = await authUser(request)

  if (!res.ok) {
    return res
  }

  const user = await res.json()

  const todos = await prisma.todo.findMany({
    where: {
      userId: user.id,
    },
  })

  return NextResponse.json(todos)
}

export async function POST(request: NextRequest) {
  const res = await authUser(request)

  if (!res.ok) {
    return res
  }
  const user = await res.json()
  const { content } = await request.json()

  const newTodo = await prisma.todo.create({
    data: {
      content: content,
      userId: user.id,
    },
  })
  return NextResponse.json(newTodo)
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const taskId = searchParams.get('id')

    if (!taskId) {
      return NextResponse.error()
    }

    const deletedTask = await prisma.todo.delete({
      where: {
        id: parseInt(taskId),
      },
    })
    return NextResponse.json(deletedTask)
  } catch (error) {
    console.error('Error deleting user:', error)
    return NextResponse.error()
  }
}

export async function PUT(request: NextRequest) {
  const res = await authUser(request)

  if (!res.ok) {
    return res
  }

  const data = await request.json()

  console.log(data)

  const updateTodo = await prisma.todo.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      done: data.done,
    },
  })

  return NextResponse.json(updateTodo)
}
