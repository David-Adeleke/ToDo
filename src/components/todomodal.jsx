import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

// Convert ISO date -> YYYY-MM-DD for <input type="date">
const toInputDate = (isoLike) => {
  if (!isoLike) return "";
  const d = new Date(isoLike);
  if (Number.isNaN(d.getTime())) return "";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

export default function TodoModal({ open, onClose, onSave, loading, initialData }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "TODO",
    priority: "LOW",
  });

  // ✅ Prefill from API fields start/end
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        description: initialData.description || "",
        startDate: toInputDate(initialData.start),
        endDate: toInputDate(initialData.end),
        status: initialData.status || "TODO",
        priority: initialData.priority || "LOW",
      });
    } else {
      setForm({
        name: "",
        description: "",
        startDate: "",
        endDate: "",
        status: "TODO",
        priority: "LOW",
      });
    }
  }, [initialData, open]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.startDate && form.endDate && form.endDate < form.startDate) {
      alert("End date cannot be before start date");
      return;
    }

    // ✅ Send exactly what API expects: start/end (ISO), name/status required
    onSave({
      name: form.name,
      status: form.status,
      description: form.description || null,
      priority: form.priority || "LOW",
      start: form.startDate ? new Date(form.startDate).toISOString() : null,
      end: form.endDate ? new Date(form.endDate).toISOString() : null,
    });
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded-xl w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">
          {initialData ? "Edit Task" : "New Task"}
        </h2>

        <input
          name="name"
          placeholder="Task name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <textarea
          name="description"
          placeholder="Task description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
          rows={3}
        />

        <div className="flex gap-2 mb-3">
          <div className="flex-1">
            <label className="block text-sm mb-1">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm mb-1">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        >
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
