import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ConfirmModal from "./ConfirmModal";

export default function Navbar({ toggleSidebar }) {
  const { user, logout } = useAuth();

  const [modalOpen, setModalOpen] = useState(false);

  const confirmLogout = () => {
    logout();
    setModalOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-zinc-900 border-b border-zinc-700 z-50 flex items-center px-4">
      
      {/* BURGER */}
      <button onClick={toggleSidebar} className="md:hidden text-zinc-300 mr-3">
        <Menu size={22} />
      </button>

      <Link to="/" className="text-lg font-bold text-orange-500">
        ArticleBro
      </Link>

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
            <Link
              to="/profile"
              className="text-sm text-zinc-300 hover:text-orange-400"
            >
              Hi, <b>{user.username}</b>
            </Link>

            <button
              onClick={() => setModalOpen(true)}
              className="text-sm pl-3 text-red-400"
            >
              Logout
            </button>
          </>
        )}
      </div>

      <ConfirmModal
        open={modalOpen}
        title="Yakin mau logout?"
        onConfirm={confirmLogout}
        onCancel={() => setModalOpen(false)}
      />
    </nav>
  );
}
