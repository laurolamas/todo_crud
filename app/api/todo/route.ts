import prisma from '@/prisma/prisma'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Read user id from header called 'id'
  const userHeader = request.headers.get('userId')
  const userId = userHeader ? userHeader : '0'

  const todos = await prisma.todo.findMany({
    where: {
      userId: parseInt(userId),
    },
  })

  return NextResponse.json(todos)
}

export async function POST(request: NextRequest) {
  const userHeader = request.headers.get('userId')
  const userId = userHeader ? userHeader : '0'
  const { content } = await request.json()

  const newTodo = await prisma.todo.create({
    data: {
      content: content,
      userId: parseInt(userId),
    },
  })
  return NextResponse.json(newTodo)
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    const taskId = searchParams.get('id')

    const deletedTask = await prisma.todo.delete({
      where: {
        id: taskId ? parseInt(taskId) : -1,
      },
    })
    return NextResponse.json(deletedTask)
  } catch (error) {
    return NextResponse.json({ error: 'Task not found' }, { status: 404 })
  }
}

export async function PUT(request: NextRequest) {
  const data = await request.json()

  const updateTodo = await prisma.todo.update({
    where: {
      id: parseInt(data.id),
    },
    data: {
      done: data.done,
      content: data.content ? data.content : '',
    },
  })

  return NextResponse.json(updateTodo)
}
