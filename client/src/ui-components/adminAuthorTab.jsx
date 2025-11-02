import { useState } from "react";
import AddAuthorForm from "./addAuthorForm";
import { API_URL } from "../../api";

function AdminAuthorTab() {
  const [authors, setAuthors] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleGetAuthors = async () => {
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/authors`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to fetch authors");
      const data = await res.json();
      setAuthors(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (id) => setEditingId(id);

  const handleChange = (id, field, value) => {
    setAuthors((prev) =>
      prev.map((author) =>
        author.id === id ? { ...author, [field]: value } : author,
      ),
    );
  };

  const handleSave = async (id) => {
    const author = authors.find((a) => a.id === id);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/authors/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(author),
      });
      if (!res.ok) throw new Error("Failed to update author");
      setEditingId(null);
    } catch (err) {
      console.error("Error updating author:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this author?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/authors/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error("Failed to delete author");
      setAuthors((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Error deleting author:", err);
    }
  };

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-mint">
        Authors CRUD Operations
      </h2>

      <button
        onClick={handleGetAuthors}
        className="text-mint border-mint border-2 mx-4 px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        GET Authors
      </button>
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="text-mint border-mint border-2 mx-4 px-4 py-2 rounded-md hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        Add New Author
      </button>
      {showAddForm && <AddAuthorForm />}

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {authors.length > 0 && (
        <ul className="mt-6 space-y-4">
          {authors.map((author) => (
            <li
              key={author.id}
              className="flex flex-col gap-2 border-b border-mint pb-4"
            >
              {editingId === author.id ? (
                <>
                  <input
                    type="text"
                    value={author.name}
                    onChange={(e) =>
                      handleChange(author.id, "name", e.target.value)
                    }
                    className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <input
                    type="text"
                    value={author.bio}
                    onChange={(e) =>
                      handleChange(author.id, "bio", e.target.value)
                    }
                    className=" text-mint border-mint border-2 font-bold px-2 py-1 rounded"
                  />
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleSave(author.id)}
                      className="text-mint border-mint border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-orange-600 border-orange-600 border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <strong>ID:</strong> {author.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {author.name}
                  </p>
                  <p>
                    <strong>Biography:</strong> {author.bio}
                  </p>
                  <p>
                    <strong>Books:</strong>{" "}
                    {author.books
                      ? author.books.map((book) => book.title).join(", ")
                      : "N/A"}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => handleEdit(author.id)}
                      className="text-mint border-mint border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(author.id)}
                      className="text-red-500 border-red-500 border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default AdminAuthorTab;
