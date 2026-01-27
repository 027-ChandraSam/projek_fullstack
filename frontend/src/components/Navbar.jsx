import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-zinc-900 border-b border-zinc-700 z-50 flex items-center px-4">
      
      {/* BURGER (MOBILE ONLY) */}
      <button
        onClick={toggleSidebar}
        className="md:hidden text-zinc-300 mr-3"
      >
        <Menu size={22} />
      </button>

      <Link to="/" className="text-lg font-bold text-orange-500">
        ArticleBro
      </Link>
      <form action="" className="pl-7">
      <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" className="bg-transparent pl-5 border-none text-orange-500" />
      </form>

      <div className="ml-auto flex items-center gap-3">
        {!user ? (
          <>
            <Link to="/login" className="text-sm text-zinc-300">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-orange-500 text-sm px-3 py-1 rounded font-semibold text-zinc-900"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-sm text-zinc-300">
              Hi, <b>{user.username}</b>
            </span>
            <button
              onClick={logout}
              className="text-sm text-red-400"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
