'use client'
import React from 'react'
import { useEffect, useState } from 'react'

interface Todo {
  id: number,
  content: string,
  done: boolean,
  userId: number
}

function page() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [content, setContent] = useState('')

    function handleChange(e:any) {
      setContent(e.target.value)
    }

    async function createTodo() {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({content})
      })
      const newTodo = await response.json()
      setTodos([...todos, newTodo])
      setContent('')
    }

  useEffect(() => {
    async function fetchData() {

      const response = await fetch('/api/todo')

      if (!response.ok) {
        //redirect to login page
        console.log('REDIRECT TO LOGIN')
        return
      }

      const todos = await response.json()
      setTodos(todos)
      
      console.log(todos)
    }
    fetchData()

  }, [])

  return (
    <div>
      <h1>Todo List</h1>
      <div className='flex flex-row'>
      <input type='text' value={content} onChange={handleChange}></input>
      <button onClick={createTodo}>Create</button>
      </div>
      <ul>
        {todos.map((todo:any) => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default page

