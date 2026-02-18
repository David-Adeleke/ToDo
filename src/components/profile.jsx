import { useEffect, useState } from "react";
import Loader from "./loader";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.oluwasetemi.dev/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch profile");
        }

        setUser(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  if (loading) return <Loader />;

  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  if (!user) return <p className="p-6">No user data available.</p>;

  return (
    <section className="p-6 max-w-md mx-auto border rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Hello, {user.name}!</h1>

      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>

      <p className="mb-2">
        <strong>Verified Email:</strong> {user.emailVerified ? "Yes" : "No"}
      </p>

      <p className="mb-2">
        <strong>Active:</strong> {user.isActive ? "Yes" : "No"}
      </p>

      <p className="mb-2">
        <strong>Last Login:</strong>{" "}
        {user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : "N/A"}
      </p>

      <p className="mb-2">
        <strong>Joined:</strong>{" "}
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
      </p>

      <p className="mb-4">
        <strong>Updated:</strong>{" "}
        {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "N/A"}
      </p>

      {user.image && (
        <img
          src={user.image}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
      )}

      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </section>
  );
}
