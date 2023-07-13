'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import { logout, getUser } from '@/app/lib/userApi'
import { Todo, getTodos, createTodo, deleteTodo, editTodo } from '@/app/lib/todoApi'

function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [content, setContent] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)

  const spinnerClasses = 'inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'

  
    useEffect(() => {
      const initial = async () => {
        const todos_fetch = await getTodos()
        setTodos(todos_fetch)
        const user = await getUser()
        setUsername(user.username)
      }
      initial()

    }, [])

    function handleChange(e:any) {
      setContent(e.target.value)
    }

    async function handleCreate() {
      if (content === '') return
      const newTodo = await createTodo(content)
      setTodos([...todos, newTodo])
      setContent('')
    }


    function handleEdit() {
      return
    }

    async function handleDelete(e:any) {
      const id = e.target.id
      deleteTodo(id)
      setTodos(todos.filter(todo => todo.id != id))
    }
    
    async function handleCheck(e:any) {
      const taskId = parseInt(e.target.id)
      const todo = todos.find((todo) => todo.id === taskId);
      if (!todo) return;
      const res = await editTodo({
        id: todo.id,
        content: todo.content,
        done: e.target.checked,
      });
      console.log(res)

      const updatedTodos = todos.map((todo) => {
        if (todo.id === taskId) {
          return { ...res };
        }
        return todo;
      });
      setTodos(updatedTodos);
    }

    async function handleLogout() {
      setLoading(true)
      const response = await logout()
      if (response.ok) {
        document.location.href = '/login'
      } else {
        setLoading(false)
        alert('Logout failed')
      }

    }

  return (
    <div className='flex flex-col p-6 justify-center items-center animate-load-element'>
      <header className='flex flex-row w-full justify-between mb-10'>
      <h1 className='text-4xl font-bold'>Todo App - {username}</h1>
      <button onClick={handleLogout} className='btn btn-secondary w-28'>
        {loading ? (<div className={spinnerClasses}></div>) : 'LOG OUT'}
      </button>
      </header>

      <div className='flex flex-row justify-center items-center'>
        <input type='text' value={content} placeholder="Enter a task" onChange={handleChange} className='input w-64 border-primary-content'></input>
        <button onClick={handleCreate} className='btn btn-primary ml-4'>Create</button>
      </div>
    
      <div className='p-2'>
        {todos.map((todo: Todo) => (
          <div key={todo.id} className='flex flex-row justify-between items-center border rounded w-96 p-2 m-5 animate-load-element'>
            <input type="checkbox" checked={todo.done} id={JSON.stringify(todo.id)} onChange={handleCheck} className="checkbox checkbox-accent checkbox-sm" /> 
            <input type="text" value={todo.content} onChange={handleChange} className="input w-full max-w-xs m-2" />
            <div className='flex flex-row gap-2'>
              <button className='btn btn-sm btn-primary' onClick={handleEdit}>Edit</button>
              <button className='btn btn-sm btn-error' onClick={handleDelete} id={JSON.stringify(todo.id)}>Remove</button>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default Home

