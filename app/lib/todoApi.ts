export interface Todo {
  id: number
  content: string
  done: boolean
}

export async function getTodos() {
  const response = await fetch('/api/todo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  })
  const resp = await response.json()
  return resp
}

export async function createTodo(content: string) {
  const response = await fetch('/api/todo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  })
  const resp = await response.json()
  return resp
}

export async function deleteTodo(id: string) {
  const response = await fetch('/api/todo/?id=' + id, {
    method: 'DELETE',
  })
  const resp = await response.json()
  return resp
}

export async function editTodo(todo: Todo) {
  const response = await fetch('/api/todo/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      done: todo.done,
      id: todo.id,
      content: todo.content,
    }),
  })
  const res = await response.json()
  return res
}
