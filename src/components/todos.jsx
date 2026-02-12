import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import TodoModal from "./todomodal";
import { Button } from '@/components/ui/button';

export default function Todos() {
  const [todos, setTodos] = useState([])
  const [meta, setMeta] = useState(null)
  const [page, setPage] = useState(1)

  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  const [openModal, setOpenModal] = useState(false)
  const [editingTodo, setEditingTodo] = useState(null)

  const token = localStorage.getItem('accessToken')

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://api.oluwasetemi.dev/posts?page=${page}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch todos')
      }

      setTodos(result.data || [])
      setMeta(result.meta || null)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [page])

  const handleSubmit = async (title) => {
    try {
      setActionLoading(true)

      const url = editingTodo ? `https://api.oluwasetemi.dev/posts/${editingTodo.id}` : `https://api.oluwasetemi.dev/posts`;
      const method = editingTodo ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ title })
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong')
      }

      setOpenModal(false)
      setEditingTodo(null)
      fetchTodos()
    } catch (error) {
      console.error(error)
    } finally {
      setActionLoading(false)
    }
  }

  const deleteTodo = async (id) => {
    try {
      setActionLoading(true);

      const response = await fetch(
        `https://api.oluwasetemi.dev/posts/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Delete failed');
      }

      fetchTodos();
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return <p className="text-center mt-10">Loading todos...</p>;
  }

  return (
    <>
      <div className="p-8 min-h-screen">
        {todos.length === 0 ? (
          <div className="flex items-center justify-center h-[70vh]">
            <button
              onClick={() => setOpenModal(true)}
              className="w-32 h-32 border-2 border-dashed rounded-xl flex items-center justify-center hover:bg-gray-100 transition"
            >
              <Plus size={40} />
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="border rounded-xl p-4 shadow-sm"
                >
                  <h3 className="font-semibold mb-4">{todo.title}</h3>

                  <div className="flex justify-between text-sm">
                    <button
                      onClick={() => {
                        setEditingTodo(todo);
                        setOpenModal(true);
                      }}
                      className="text-blue-500"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-500"
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Deleting...' : 'Delete'}
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setOpenModal(true)}
                className="border-2 border-dashed rounded-xl flex items-center justify-center hover:bg-gray-100 transition"
              >
                <Plus size={40} />
              </button>
            </div>

            {meta && (
              <div className="flex justify-center gap-4 mt-8">
                <Button
                  disabled={!meta.hasPreviousPage}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Prev
                </Button>

                <span className="flex items-center">
                  Page {meta.page} of {meta.totalPages}
                </span>

                <Button
                  disabled={!meta.hasNextPage}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}

        <TodoModal
          open={openModal}
          setOpen={setOpenModal}
          onSubmit={handleSubmit}
          defaultValue={editingTodo?.title}
          loading={actionLoading}
        />
      </div>
    </>
  )
}