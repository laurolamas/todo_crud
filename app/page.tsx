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
          document.location.href = 'http://localhost:3000/login'
          return
        }

        const todos = await response.json()
        setTodos(todos)
        
        console.log(todos)
      }
      fetchData()

    }, [])

    useEffect(() => {
      console.log(todos)
    }, [todos])

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

  return (
    <div className='flex flex-col p-2'>
      <h1>Todo List</h1>
      <input type='text' value={content} onChange={handleChange} className='w-96'></input>
      <button onClick={createTodo}>Create</button>
      <input type='checkbox'/>
    
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

