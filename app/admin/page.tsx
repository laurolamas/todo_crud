'use client'
import { useState } from 'react'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function createUser (){

    const newUser = {username:username, password:password}

    const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify(newUser)
  })

  const resp = await response.text()  

  console.log(resp)
  }

  async function deleteUser() {


  console.log(username)

    const response = await fetch(`/api/user?username=${username}`, {
      method: 'DELETE',
      headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    });

  }

  async function updateUser() {
     const user = {username:username, password:password}

    const response = await fetch('/api/user', {
    method: 'PUT',
    headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
    },
    body: JSON.stringify(user)
  })

  const resp = await response.text()  

  console.log(resp)
  }

  return (
    <main>
      <h1>HOME PAGE</h1>    
      <input type='text' className="border" value={username} onChange={(e) => setUsername(e.target.value)}/>
      <input type='text' className="border" value={password} onChange={(e) => setPassword(e.target.value)}/>
      <button onClick={createUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">SUBMIT</button>
      <button onClick={deleteUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">DELETE</button>
      <button onClick={updateUser} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">UPDATE</button>
    </main>
  )
}
