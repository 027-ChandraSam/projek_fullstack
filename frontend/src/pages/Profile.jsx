import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { FileText, Heart, Bookmark } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    if (!user?.id) return;
  
    fetchUserPosts();
    fetchLikedPosts();
    fetchSavedPosts();
  }, [user]);
  

  const fetchUserPosts = async () => {
    const res = await api.get(`/posts/author/${user.username}`);
    setPosts(res.data);
  };

  // Frontend
const fetchLikedPosts = async () => {
  const res = await api.get("/likes"); // GET /api/likes
  setLikedPosts(res.data);
};

const fetchSavedPosts = async () => {
  const res = await api.get("/saves"); // GET /api/saves  
  setSavedPosts(res.data);
};

  if (!user) return null;

  const renderPosts = (data) => {
    if (!data.length) {
      return <div className="text-zinc-500">Tidak ada data.</div>;
    }

    return (
      <div className="divide-y divide-zinc-800">
        {data.map((post) => (
          <a
            key={post.id}
            href={`/posts/${post.id}`}
            className="block py-4 hover:bg-zinc-900/40 transition px-2 rounded-lg"
          >
            <h3 className="font-semibold text-white">{post.title}</h3>

            <div className="flex gap-4 text-xs text-zinc-500 mt-1">
              <span>{post.category}</span>
              <span>
                {new Date(post.created_at).toLocaleDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  };

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
          </div>

          <div className="border-t border-zinc-800 pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span className="text-zinc-500">Total Post</span>
              <span>{posts.length}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-500">Role</span>
              <span className="capitalize">{user.role}</span>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          {/* TAB HEADER */}
          <div className="relative border-b border-zinc-800 mb-6">
            <div className="flex gap-6 text-sm font-medium">
              <button
                onClick={() => setActiveTab("posts")}
                className={`pb-3 flex items-center gap-2 ${
                  activeTab === "posts"
                    ? "text-white"
                    : "text-zinc-500"
                }`}
              >
                <FileText size={16} />
                Postingan
              </button>

              <button
                onClick={() => setActiveTab("likes")}
                className={`pb-3 flex items-center gap-2 ${
                  activeTab === "likes"
                    ? "text-white"
                    : "text-zinc-500"
                }`}
              >
                <Heart size={16} />
                Disukai
              </button>

              <button
                onClick={() => setActiveTab("saved")}
                className={`pb-3 flex items-center gap-2 ${
                  activeTab === "saves"
                    ? "text-white"
                    : "text-zinc-500"
                }`}
              >
                <Bookmark size={16} />
                Disimpan
              </button>
            </div>

            {/* SLIDING INDICATOR */}
            <div
              className={`absolute bottom-0 h-[2px] bg-orange-500 transition-all duration-300 ${
                activeTab === "posts"
                  ? "left-0 w-[90px]"
                  : activeTab === "likes"
                  ? "left-[110px] w-[70px]"
                  : "left-[200px] w-[90px]"
              }`}
            />
          </div>

          {/* TAB CONTENT */}
          <div className="animate-fadeIn">
            {activeTab === "posts" && renderPosts(posts)}
            {activeTab === "likes" && renderPosts(likedPosts)}
            {activeTab === "saved" && renderPosts(savedPosts)}
          </div>
        </div>
      </div>
    </div>
  );
}
