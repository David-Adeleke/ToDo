import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const BASE_URL = "https://api.oluwasetemi.dev"

export default function TodoDetails() {
  const {id}= useParams()
  const navigate = useNavigate()

  const [todo, setTodo] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('accessToken')

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/todo/${id}`, {
          headers: {
            Authorisation: `Bearer ${token}`
          }
        })

        const result= await response.json()

        if(!response.ok) {
          throw new Error(result.message || 'Failed to fetch todo')
        }

        setTodo(result.data)
      } catch(err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
  }, [id])

  if(loading) {
    return <p className="p-6">Loading Todo details....</p>
  }

  if(error) {
    return (
      <div className="p-6 text-red-600">
        Error: {error}
      </div>
    )
  }

  if(!todo) {
    return (
      <div className="p-6">
        Todo Not Found.
      </div>
    )
  }

  return (
    <section className="p-6 max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm underline"
      >
        ← Back
      </button>

      <h1 className="text-2xl font-bold mb-4">{todo.name}</h1>

      <p className="mb-2">
        <strong>Status:</strong> {todo.status}
      </p>

      <p className="mb-2">
        <strong>Priority:</strong> {todo.priority}
      </p>

      <p className="mb-4">
        <strong>Description:</strong>{" "}
        {todo.description || "No description"}
      </p>

      <p className="text-sm text-gray-500">
        Created: {new Date(todo.createdAt).toLocaleString()}
      </p>

      <p className="text-sm text-gray-500">
        Updated: {new Date(todo.updatedAt).toLocaleString()}
      </p>
    </section>
  )
}