import { useEffect, useState } from "react";
import api from "../services/api";
import UserList from "../components/UserList";
import { updateUserRole } from "../services/user.service";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data);
      console.log(res.data)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (id) => {
    try {
      await updateUserRole(id, "admin");
      fetchUsers();
    } catch {
      alert("Gagal update role");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus user ini?")) return;

    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch {
      alert("Gagal hapus user");
    }
  };



  if (loading) return <div className="p-6 text-zinc-400">Loading...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-bold text-white">
        User Management
      </h1>

      <UserList
        users={users}
        onRoleChange={handleRoleChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
