import { createContext, useState, useEffect } from "react";
import { API_URL } from "../../api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  //check if user is logged on when app loads
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    const loggedInToken = localStorage.getItem("token");
    if (loggedInUser && loggedInToken) {
      setUser(JSON.parse(loggedInUser));
      setToken(loggedInToken);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      const result = await response.json();
      setUser(result.user);
      setToken(result.token);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
