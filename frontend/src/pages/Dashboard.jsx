import { useEffect, useState } from "react";
import { getAllPosts, deletePost, approvePost } from "../services/post.sevice";
import { FileText, CheckCircle, Clock } from "lucide-react";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    pendingPosts: 0,
    approvedPosts: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getAllPosts();
      const data = res.data;
      setPosts(data);

      setStats({
        totalPosts: data.length,
        pendingPosts: data.filter(p => p.status !== "approved").length,
        approvedPosts: data.filter(p => p.status === "approved").length,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    if (!window.confirm("Approve postingan ini?")) return;

    try {
      await approvePost(id);

      setPosts(posts.map((post) =>
        post.id === id ? { ...post, status: "approved" } : post
      ));
    } catch {
      alert("Gagal approve");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Hapus postingan ini?")) return;

    try {
      await deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch {
      alert("Gagal hapus");
    }
  };

  if (loading) return <div className="p-8 text-zinc-400">Loading dashboard...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 p-8">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">
        <StatCard
          label="Total Post"
          value={stats.totalPosts}
          icon={<FileText />}
        />

        <StatCard
          label="Approved"
          value={stats.approvedPosts}
          icon={<CheckCircle />}
        />

        <StatCard
          label="Pending"
          value={stats.pendingPosts}
          icon={<Clock />}
        />
      </div>

      {/* TABLE */}
      <div className="border border-zinc-800 rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-zinc-900 text-zinc-400">
            <tr>
              <th className="px-6 py-4 text-left">Judul</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-right">Aksi</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-zinc-800">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-zinc-900/40">
                <td className="px-6 py-4 font-medium text-white">
                  {post.title}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      post.status === "approved"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {post.status || "pending"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right space-x-4">
                  {post.status !== "approved" && (
                    <button
                      onClick={() => handleApprove(post.id)}
                      className="text-emerald-400 hover:text-emerald-300"
                    >
                      Approve
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(post.id)}
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
    </div>
  );
}

function StatCard({ label, value, icon }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
      <div className="text-zinc-400 mb-3">{icon}</div>
      <p className="text-zinc-400 text-sm">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
}