'use client'
import { useState } from 'react'
import { createUser, updateUser, deleteUser } from '@/app/lib/userApi'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleCreate() {

    const newUser = {username:username, password:password}

    const res = createUser(newUser)

    console.log(res)
  }

  async function handleDelete() {

    const res = deleteUser(username)

    console.log(res)

  }

  async function handleUpdate() {
    const user = {username:username, password:password}
    
    const res = updateUser(user)

    console.log(res)

  }

  return (
    <main>
      <h1>HOME PAGE</h1>    
      <input type='text' className="border" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type='text' className="border" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={handleCreate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">SUBMIT</button>
      <button onClick={handleDelete} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">DELETE</button>
      <button onClick={handleUpdate} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">UPDATE</button>
    </main>
  )
}
