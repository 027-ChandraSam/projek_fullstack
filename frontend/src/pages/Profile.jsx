import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { FileText } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (user?.username) fetchUserPosts();
  }, [user]);

  const fetchUserPosts = async () => {
    try {
      const res = await api.get(`/posts/author/${user.username}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-zinc-200">
      <div className="grid md:grid-cols-[280px_1fr] gap-10">

        {/* LEFT PROFILE PANEL */}
        <div className="space-y-6">
          <div className="flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-bold">
              {user.username.charAt(0).toUpperCase()}
            </div>

            <h1 className="text-xl font-semibold mt-4">
              {user.username}
            </h1>

            <p className="text-zinc-500 text-sm">{user.email}</p>
            <p className="text-orange-400 text-sm capitalize mt-1">
              {user.role}
            </p>
          </div>

          <div className="border-t border-zinc-800 pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-500">Total Post</span>
              <span>{posts.length}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Account Type</span>
              <span className="capitalize">{user.role}</span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-6">
            <FileText size={18} />
            <h2 className="text-lg font-semibold">Postingan Kamu</h2>
          </div>

          {posts.length === 0 ? (
            <div className="text-zinc-500">
              Kamu belum membuat postingan.
            </div>
          ) : (
            <div className="divide-y divide-zinc-800">
              {posts.map((post) => (
                <a
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="block py-4 hover:bg-zinc-900/40 transition px-2 rounded-lg"
                >
                  <h3 className="font-semibold text-white">
                    {post.title}
                  </h3>

                  <div className="flex gap-4 text-xs text-zinc-500 mt-1">
                    <span>{post.category}</span>
                    <span>
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
