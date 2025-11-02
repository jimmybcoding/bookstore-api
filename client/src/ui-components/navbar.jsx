import { useContext, useState } from "react";
import { Book } from "lucide-react";
import { AuthContext } from "../context/authContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="relative bg-black text-white">
        <div className="flex items-center justify-between p-6">
          {/* Left side: logo + text */}
          <div className="flex items-center space-x-2 text-xl font-bold">
            <Book className="w-8 h-8 text-white" />
            <span>SpiceShelf</span>
          </div>

          {/* Right side: nav links */}
          <div className="hidden md:flex space-x-6">
            <a href="/" className="hover:text-gray-400">
              Home
            </a>
            <a href="/books" className="hover:text-gray-400">
              Books
            </a>
            {!user ? (
              <a href="/login" className="hover:text-gray-400">
                Login
              </a>
            ) : (
              <a onClick={logout} className="hover:text-gray-400">
                Logout
              </a>
            )}
            {user?.isAdmin && (
              <a href="/admin" className="hover:text-gray-400">
                Admin
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out md:hidden ${
          menuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col items-center bg-black space-y-4 p-4">
          <a href="/" className="hover:text-gray-400">
            Home
          </a>
          <a href="/books" className="hover:text-gray-400">
            Books
          </a>
          {!user ? (
            <a href="/login" className="hover:text-gray-400">
              Login
            </a>
          ) : (
            <a onClick={logout} className="hover:text-gray-400">
              Logout
            </a>
          )}
          {user?.isAdmin && (
            <a href="/admin" className="hover:text-gray-400">
              Admin
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
