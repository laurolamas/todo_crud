export interface User {
  username: string
  password: string
}

export async function createUser(user: User) {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(user),
  })
  const resp = await response.json()
  return resp
}

export async function deleteUser(username: string) {
  const response = await fetch(`/api/user?username=${username}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  const resp = await response.json()
  return resp
}

export async function updateUser(user: User) {
  const response = await fetch('/api/user', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(user),
  })

  const resp = await response.json()
  return resp
}

export async function login(user: User) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(user),
  })
  return response
}

export async function logout() {
  const response = await fetch('/api/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  return response
}
