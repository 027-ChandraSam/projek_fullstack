import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar({ open, close }) {
  const { user } = useAuth();

  return (
    <>
      {/* OVERLAY (MOBILE) */}
      {open && (
        <div
          onClick={close}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      <aside
        className={`
          fixed top-14 left-0 h-[calc(100vh-56px)] w-60
          bg-zinc-900 border-r border-zinc-800 z-50
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:flex
        `}
      >
        <div className="w-full p-4 space-y-4 text-zinc-300 text-sm">

          {/* MAIN */}
          <div>
            <p className="text-xs uppercase text-zinc-500 mb-2">Main</p>
            <Link
              to="/"
              onClick={close}
              className="block px-3 py-2 rounded hover:bg-zinc-800"
            >
              🏠 Home
            </Link>
          </div>

          {/* USER */}
          {user && (
            <div>
              <p className="text-xs uppercase text-zinc-500 mb-2">Your Stuff</p>
              <Link
                to="/create"
                onClick={close}
                className="block px-3 py-2 rounded hover:bg-zinc-800"
              >
                ✍️ Create Post
              </Link>
              <Link
                to="/save"
                onClick={close}
                className="block px-3 py-2 rounded hover:bg-zinc-800"
              >
                💾 Saved
              </Link>
              <Link
                to="/like"
                onClick={close}
                className="block px-3 py-2 rounded hover:bg-zinc-800"
              >
                ❤️ Liked
              </Link>
            </div>
          )}

          {/* ADMIN */}
          {user?.role === "admin" && (
            <div>
              <p className="text-xs uppercase text-zinc-500 mb-2">Admin</p>
              <Link
                to="/Admin"
                onClick={close}
                className="block px-3 py-2 rounded hover:bg-zinc-800 text-orange-400"
              >
                🛠 Dashboard
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
