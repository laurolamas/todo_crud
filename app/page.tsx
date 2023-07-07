'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { logout } from '@/app/lib/api'

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
        const todos = await response.json()
        setTodos(todos)
        
        console.log(todos)
      }
      fetchData()

    }, [])

    function handleEdit() {
      return
    }

    function handleDelete(e:any) {
      const id = e.target.id
      const response = fetch('/api/todo/?id=' + id, {
        method: 'DELETE'
      })
      setTodos(todos.filter(todo => todo.id != id))
    }
    
    async function handleCheck(e:any) {
      const taskId = e.target.id
      const response = fetch('/api/todo/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({done: e.target.checked, id: taskId})
      })

      const updatedTodos = todos.map((todo) => {
        if (todo.id === parseInt(taskId)) {
          return { ...todo, done: e.target.checked };
        }
        return todo;
      });
      setTodos(updatedTodos);
    }

    async function handleLogout() {
      const response = await logout()
      document.location.href = 'http://localhost:3000/login'
    }

  return (
    <div className='flex flex-col p-6'>
      <h1 className='menu-title'>Todo List</h1>
      <div onClick={handleLogout} className='btn btn-secondary'>LOG OUT</div>
      <div className=''>
      <input type='text' value={content} placeholder="Type here" onChange={handleChange} className='input input-bordered w-full max-w-xs'></input>
      <div onClick={createTodo} className='btn btn-primary'>Create</div>
      </div>
    
      <div className='p-2'>
        {todos.map((todo: Todo) => (
          <div key={todo.id} className='flex flex-row justify-evenly border rounded w-96 p-2 '>
            <input type="checkbox" checked={todo.done} id={JSON.stringify(todo.id)} onChange={handleCheck} /> 
            <p>{todo.content}</p>
            <div className='btn' onClick={handleEdit}>Edit</div>
            <div className='btn' onClick={handleDelete} id={JSON.stringify(todo.id)}>Remove</div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default page

