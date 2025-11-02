import { useState } from "react";
import { API_URL } from "../../api";

function AddUserForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Failed to create user");
      setFormData({ name: "", email: "", password: "" });
      alert("User created successfully");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-4">
      <label className="text-mint">Name:</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        required
        onChange={handleChange}
        className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
      />
      <label className="text-mint">Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        required
        onChange={handleChange}
        className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
      />
      <label className="text-mint">Password:</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        required
        onChange={handleChange}
        className="text-mint border-mint border-2 font-bold px-2 py-1 rounded"
      />
      <button
        type="submit"
        className="w-1/4 font-extrabold text-mint border-mint border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        Create User
      </button>
    </form>
  );
}

export default AddUserForm;
