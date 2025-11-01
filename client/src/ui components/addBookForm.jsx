import { useState } from "react";
import { API_URL } from "../../api";

function AddBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    published: "",
    isbn: "",
    price: "",
    pic: "",
    authorId: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create book");
      setFormData({
        title: "",
        published: "",
        isbn: "",
        price: "",
        pic: "",
        authorId: "",
      });
      alert("Book created successfully");
    } catch (error) {
      console.error("Error creating book:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price"
          ? parseFloat(value)
          : name === "authorId"
            ? parseInt(value)
            : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-4">
      <label className="text-mint">Title:</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        required
        onChange={handleChange}
        className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
      />

      <label className="text-mint">Published:</label>
      <input
        type="date"
        name="published"
        value={formData.published}
        required
        onChange={handleChange}
        className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
      />

      <label className="text-mint">ISBN:</label>
      <input
        type="text"
        name="isbn"
        value={formData.isbn}
        required
        onChange={handleChange}
        className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
      />

      <label className="text-mint">Price:</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        required
        step="0.01"
        onChange={handleChange}
        className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
      />

      <label className="text-mint">
        Picture URL- Need to upload pic to images folder and use this format:
        images/pic.jpg
      </label>
      <input
        type="text"
        name="pic"
        value={formData.pic}
        required
        onChange={handleChange}
        className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
      />

      <label className="text-mint">Author ID:</label>
      <input
        type="number"
        name="authorId"
        value={formData.authorId}
        required
        onChange={handleChange}
        className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
      />

      <button
        type="submit"
        className="w-1/4 font-extrabold text-mint border-mint border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        Create Book
      </button>
    </form>
  );
}

export default AddBookForm;
