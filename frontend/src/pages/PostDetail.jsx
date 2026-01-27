import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPostById,
  toggleLike,
  toggleSave,
  addComment,
} from "../services/post.sevice.js"

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    fetchPost();
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await getPostById(id);
      setPost(res.data);
    } catch {
      alert("Post tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  // ❤️ LIKE (Optimistic)
  const handleLike = async () => {
    setPost((prev) => ({
      ...prev,
      is_liked: !prev.is_liked,
      likes_count: prev.is_liked
        ? prev.likes_count - 1
        : prev.likes_count + 1,
    }));

    try {
      await toggleLike(id);
    } catch {
      fetchPost(); // rollback
      alert("Gagal like");
    }
  };

  // 🔖 SAVE
  const handleSave = async () => {
    setPost((prev) => ({
      ...prev,
      is_saved: !prev.is_saved,
    }));

    try {
      await toggleSave(id);
    } catch {
      fetchPost();
      alert("Gagal menyimpan");
    }
  };

  // 💬 COMMENT (langsung muncul)
  const handleComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
  
    setSending(true);
    try {
      await addComment(id, { content: commentText });
  
      setPost((prev) => ({
        ...prev,
        comments: [
          {
            id: Date.now(),
            username: user.username,
            content: commentText
          },
          ...(prev.comments || [])
        ]
      }));
  
      setCommentText("");
    } catch {
      alert("Gagal kirim komentar");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="text-zinc-400 p-4">Loading...</p>;
  if (!post) return <p className="text-zinc-400 p-4">Post kosong</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 text-zinc-200">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-sm text-zinc-400 mb-6">
        Posted by <b>{post.username}</b> •{" "}
        {new Date(post.created_at).toLocaleDateString()}
      </p>

      <div className="prose prose-invert mb-8 border-b border-zinc-800 pb-6">
        {post.content}
      </div>

      {/* LIKE & SAVE */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={handleLike}
          className={`px-4 py-2 rounded-full flex gap-2 items-center
            ${
              post.is_liked
                ? "bg-red-600 hover:bg-red-700"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
        >
          ❤️
        </button>

        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-full
            ${
              post.is_saved
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
        >
          🔖 {post.is_saved ? "Tersimpan" : "Simpan"}
        </button>
      </div>

      {/* KOMENTAR ala YOUTUBE */}
      <section>
        <h3 className="text-xl font-semibold mb-4">
          {post.comments?.length || 0} Komentar
        </h3>

        <form onSubmit={handleComment} className="mb-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="3"
            placeholder="Tambahkan komentar..."
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex justify-end mt-2 gap-2">
            <button
              type="button"
              onClick={() => setCommentText("")}
              className="px-4 py-2 text-sm text-zinc-400 hover:text-white"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={sending}
              className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg text-sm"
            >
              {sending ? "Mengirim..." : "Komentar"}
            </button>
          </div>
        </form>

        <div className="space-y-4">
          {post.comments?.map((c) => (
            <div
              key={c.id}
              className="bg-zinc-900 p-4 rounded-lg border border-zinc-800"
            >
              <p className="font-semibold text-blue-400">{c.username}</p>
              <p className="text-zinc-300 mt-1">{c.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
