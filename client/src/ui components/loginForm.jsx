import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

function LoginForm() {
  const { login, logout } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
      alert("Logged in successfully!");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 my-4">
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
        Login
      </button>
      <button
        onClick={logout}
        className="w-1/4 font-extrabold text-mint border-mint border-2 px-3 py-1 rounded hover:cursor-pointer hover:scale-105 transform transition-transform duration-300"
      >
        Logout
      </button>
    </form>
  );
}

export default LoginForm;
