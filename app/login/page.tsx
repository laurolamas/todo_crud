'use client'
import { useEffect, useState } from 'react'
import { createUser, updateUser, deleteUser, login } from '@/app/lib/api'


// You can use the `useClient` hook to access the client from any component like so:
// import { useClient } from '@/app/lib/client'
//

//Note: this is a hack to make the modal work
//TODO: find a better way to do this
//Not working currently
declare global {
  interface window {
   my_modal_3: any
  }
}

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    console.log(document.cookie)
    if (document.cookie.includes('userToken')) {
      document.location.href = 'http://localhost:3000/' 
    }
  }, [])

  async function handleLogin() {
    const user = {username:username, password:password}

    const response = await login(user)

    if (response.ok) {
      document.location.href = 'http://localhost:3000/'
    }

    setUsername('')
    setPassword('')

    console.log(response)
  }

  return (
    <main className="">
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold">Login now!</h1>
      <p className="py-6">Login to access the list of your to-dos</p>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} value={username} className="input input-bordered"  />
        </div>
        <div className="form-control">      
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} value={password} className="input input-bordered" />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button onClick={handleLogin} className="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
</div>
<dialog id="my_modal_3" className="modal">
  <form method="dialog" className="modal-box">
    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click on ✕ button to close</p>
  </form>
</dialog>
{/* You can open the modal using ID.showModal() method */}
<button className="btn" onClick={()=>window.my_modal_3.showModal()}>Create new user</button>
    </main>
  )
}
