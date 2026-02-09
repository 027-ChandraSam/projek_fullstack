export default function UserList({ users, onRoleChange, onDelete }) {
  if (!users.length) {
    return (
      <div className="text-zinc-500 text-center py-6">
        Tidak ada user
      </div>
    );
  }

  return (
    <div className="border border-zinc-800 rounded-2xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-zinc-900 text-zinc-400">
          <tr>
            <th className="px-6 py-4 text-left">Nama User</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-zinc-800">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-zinc-900/40">
              <td className="px-6 py-4 font-medium text-white">
                {user.username}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    user.role === "admin"
                      ? "bg-green-500/10 text-green-400"
                      : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {user.role || "user"}
                </span>
              </td>

              <td className="px-6 py-4 text-right space-x-4">
                {user.role !== "admin" && (
                  <button
                    onClick={() => onRoleChange(user.id)}
                    className="text-emerald-400 hover:text-emerald-300"
                  >
                    Jadikan Admin
                  </button>
                )}

                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
