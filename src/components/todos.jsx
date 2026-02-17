import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./searchbox";
import TodoModal from "./todomodal";
import { Button } from "@/components/ui/button";

const BASE_URL = "https://api.oluwasetemi.dev";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [meta, setMeta] = useState(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [loading, setLoading] = useState(true);
  const [action, setAction] = useState(null);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const token = localStorage.getItem("accessToken");

  // ================= FETCH TODOS =================
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);

      let query = `?page=${page}&limit=10&search=${search}`;
      if (status !== "ALL") query += `&status=${status}`;

      const response = await fetch(`${BASE_URL}/tasks${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Failed to fetch tasks");
      }

      const result = await response.json();
      setTasks(result.data || []);
      setMeta(result.meta || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, status]);

  // ================= CREATE / UPDATE =================
  const handleSave = async (data) => {
    try {
      setAction("save");

      const url = editingTask
        ? `${BASE_URL}/tasks/${editingTask.id}`
        : `${BASE_URL}/tasks`;

      const response = await fetch(url, {
        method: editingTask ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Something went wrong");
      }

      setOpenModal(false);
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      alert(err.message);
    } finally {
      setAction(null);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return;

    try {
      setAction(id);

      const response = await fetch(`${BASE_URL}/tasks/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Failed to delete");
      }

      fetchTasks();
    } catch (err) {
      alert(err.message);
    } finally {
      setAction(null);
    }
  };

  return (
    <section className="p-6 min-h-screen">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
        <h1 className="text-2xl font-bold">Tasks</h1>

        <div className="flex gap-4 flex-wrap">
          <SearchBox
            value={search}
            onChange={(value) => {
              setPage(1);
              setSearch(value);
            }}
            loading={loading}
          />

          <select
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
            className="border px-3 py-2 rounded"
          >
            <option value="ALL">All</option>
            <option value="TODO">Todo</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="DONE">Done</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>
      </header>

      {error && <div className="mb-4 p-4 bg-red-100 text-red-600 rounded">{error}</div>}
      {loading && <p className="text-center mt-10">Loading...</p>}

      {!loading && tasks.length === 0 && (
        <div className="flex justify-center items-center h-[60vh]">
          <button
            onClick={() => {
              setEditingTask(null);
              setOpenModal(true);
            }}
            className="text-6xl border rounded-2xl w-32 h-32 flex items-center justify-center hover:bg-gray-100 transition"
          >
            +
          </button>
        </div>
      )}

      {!loading && tasks.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="border rounded-xl p-4 shadow-sm flex flex-col justify-between"
              >
                <Link to={`/tasks/${task.id}`}>
                  <h2 className="font-semibold mb-2 truncate">{task.name}</h2>
                </Link>

                {task.description && (
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {task.description}
                  </p>
                )}

                <p className="text-sm mb-1">Status: {task.status}</p>
                <p className="mb-1">
                  <span className="font-medium">Priority:</span> {task.priority}
                </p>

                {task.startDate && (
                  <p className="text-xs text-gray-500">
                    Start: {new Date(task.startDate).toLocaleDateString()}
                  </p>
                )}

                {task.endDate && (
                  <p className="text-xs text-gray-500 mb-2">
                    Start: {new Date(task.endDate).toLocaleDateString()}
                  </p>
                )}

                <div className="flex justify-between gap-2">
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingTask(task);
                      setOpenModal(true);
                    }}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={action === task.id}
                    onClick={() => handleDelete(task.id)}
                  >
                    {action === task.id ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            ))}

            <button
              onClick={() => {
                setEditingTask(null);
                setOpenModal(true);
              }}
              className="border-2 border-dashed rounded-xl flex items-center justify-center text-4xl hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>

          {meta && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button disabled={!meta.hasPreviousPage} onClick={() => setPage((p) => p - 1)}>Prev</Button>
              <span>Page {meta.page} of {meta.totalPages}</span>
              <Button disabled={!meta.hasNextPage} onClick={() => setPage((p) => p + 1)}>Next</Button>
            </div>
          )}
        </>
      )}

      {openModal && (
        <TodoModal
          open={openModal}
          onClose={() => {
            setOpenModal(false);
            setEditingTask(null);
          }}
          onSave={handleSave}
          loading={action === "save"}
          initialData={editingTask}
        />
      )}
    </section>
  );
}
