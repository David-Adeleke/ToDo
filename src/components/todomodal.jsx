import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function TodoModal({ open, onClose, onSave, loading, initialData }) {
  const [form, setForm] = useState({
    name: "",
    status: "TODO",
    priority: "LOW",
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || "",
        status: initialData.status || "TODO",
        priority: initialData.priority || "LOW",
      });
    } else {
      setForm({ name: "", status: "TODO", priority: "LOW" });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <form className="bg-white p-6 rounded-xl w-96" onSubmit={handleSubmit}>
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit Task" : "New Task"}</h2>

        <input
          name="name"
          placeholder="Task name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
          required
        />

        <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded mb-4">
          <option value="TODO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <select name="priority" value={form.priority} onChange={handleChange} className="w-full border p-2 rounded mb-4">
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

        <div className="flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save"}</Button>
        </div>
      </form>
    </div>
  );
}
