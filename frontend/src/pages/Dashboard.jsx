import { useEffect, useState } from "react";
import { getAllPosts, deletePost, approvePost } from "../services/post.sevice"; 

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    pendingPosts: 0,
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
        // Contoh menghitung postingan yang belum di-approve
        pendingPosts: data.filter(p => p.status !== 'approved').length,
      });
    } catch (err) {
      console.error("Gagal mengambil data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("Sesi kamu habis, silakan login kembali sebagai Admin.");
      return;
    }
  
    if (window.confirm("Ingin Approve postingan ini?")) {
      try {
        // API akan menggunakan token dari interceptor di atas
        await approvePost(id); 
        
        setPosts(posts.map((post) => 
          post.id === id ? { ...post, status: 'approved' } : post
        ));
        
        alert("Postingan berhasil disetujui!");
      } catch (err) {
        if (err.response?.status === 401) {
          alert("Kamu tidak memiliki akses Admin atau token tidak valid.");
        } else {
          alert("Gagal menyetujui postingan");
        }
        console.error(err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus postingan ini?")) {
      try {
        await deletePost(id);
        setPosts(posts.filter((post) => post.id !== id));
        alert("Postingan berhasil dihapus");
      } catch (err) {
        alert("Gagal menghapus postingan");
      }
    }
  };

  if (loading) return <div className="p-8 text-zinc-400">Memuat data API...</div>;

  return (
    <div className="flex min-h-screen bg-zinc-950 text-zinc-200">
      <main className="flex-1 p-8">
        <header className="mb-8">
            <h1 className="text-2xl font-bold text-white">Manajemen Postingan</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <StatCard label="Total Posts" value={stats.totalPosts} icon="📝" color="text-blue-500" />
        </div>

        <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-zinc-800/50 text-zinc-400 text-sm">
              <tr>
                <th className="px-6 py-4">Judul</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">{post.title}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs ${
                      post.status === 'approved' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {post.status || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    {post.status !== 'approved' && (
                      <button 
                        onClick={() => handleApprove(post.id)}
                        className="text-emerald-400 hover:text-emerald-300 font-medium"
                      >
                        Approve
                      </button>
                    )}
                    <button 
                      onClick={() => handleDelete(post.id)}
                      className="text-red-400 hover:text-red-300 font-medium"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

function StatCard({ label, value, icon, color }) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
        <div className="text-2xl mb-2">{icon}</div>
        <p className="text-zinc-400 text-sm">{label}</p>
        <p className={`text-3xl font-bold ${color}`}>{value.toLocaleString()}</p>
      </div>
    );
}