import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TodoModal from "./todomodal";
import { Button } from "@/components/ui/button";
import Loader from "./loader";

const BASE_URL = "https://api.oluwasetemi.dev";

export default function TodoDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [action, setAction] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch todo");
        }

        setTodo(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id, token]);

  // ================= DELETE =================
  const handleDelete = async () => {
    if (!confirm("Delete this task?")) return;

    try {
      setAction("delete");

      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      navigate("/tasks");
    } catch (err) {
      alert(err.message);
    } finally {
      setAction(null);
    }
  };

  // ================= EDIT =================
  const handleSave = async (data) => {
    try {
      setAction("save");

      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Update failed");
      }

      setTodo(result.data || result);
      setOpenModal(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setAction(null);
    }
  };

  const formatText = (value) =>
    value
      ?.toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

  if (loading) return <Loader />;

  if (error)
    return <div className="p-6 text-red-600">Error: {error}</div>;

  if (!todo)
    return <div className="p-6">Todo Not Found.</div>;

  return (
    <section className="p-6 max-w-3xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-sm text-gray-600 hover:underline"
      >
        ← Back
      </button>

      <div className="bg-white shadow-md rounded-2xl p-8 border">
        {/* Title + Actions */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-3xl font-bold">{todo.name}</h1>

          <div className="flex gap-2">
            <Button size="sm" onClick={() => setOpenModal(true)}>
              Edit
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={handleDelete}
              disabled={action === "delete"}
            >
              {action === "delete" ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>

        {/* Status & Priority */}
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="px-3 py-1 text-sm rounded-full bg-gray-100">
            Status: {formatText(todo.status)}
          </span>

          <span className="px-3 py-1 text-sm rounded-full bg-gray-100">
            Priority: {formatText(todo.priority)}
          </span>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="font-semibold mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {todo.description || "No description provided."}
          </p>
        </div>

        {/* Dates */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {todo.start && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Start Date
              </h3>
              <p>{new Date(todo.start).toLocaleDateString()}</p>
            </div>
          )}

          {todo.end && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                End Date
              </h3>
              <p>{new Date(todo.end).toLocaleDateString()}</p>
            </div>
          )}
        </div>

        {/* Meta */}
        <div className="border-t pt-4 text-sm text-gray-500 space-y-1">
          <p>
            Created:{" "}
            {todo.createdAt
              ? new Date(todo.createdAt).toLocaleString()
              : "N/A"}
          </p>

          <p>
            Updated:{" "}
            {todo.updatedAt
              ? new Date(todo.updatedAt).toLocaleString()
              : "N/A"}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      {openModal && (
        <TodoModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onSave={handleSave}
          loading={action === "save"}
          initialData={todo}
        />
      )}
    </section>
  );
}
