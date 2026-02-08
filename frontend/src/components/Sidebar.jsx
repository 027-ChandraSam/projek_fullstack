import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  House,
  PenLine,
  LayoutDashboard,
} from "lucide-react";

export default function Sidebar({ open, close }) {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuClass = (path) =>
    `flex items-center gap-2 px-3 py-2 rounded transition ${
      isActive(path)
        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
        : "hover:bg-zinc-800 text-zinc-300"
    }`;

  return (
    <>
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
        <div className="w-full p-4 space-y-6 text-sm">

          {/* MAIN */}
          <div>
            <p className="text-xs uppercase text-zinc-500 mb-2">Main</p>
            <Link to="/" onClick={close} className={menuClass("/")}>
              <House size={18} />
              Home
            </Link>
          </div>

          {/* USER */}
          {user && (
            <div>
              <p className="text-xs uppercase text-zinc-500 mb-2">
                Your Stuff
              </p>
              <Link
                to="/create"
                onClick={close}
                className={menuClass("/create")}
              >
                <PenLine size={18} />
                Create Post
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
                className={menuClass("/Admin")}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
  