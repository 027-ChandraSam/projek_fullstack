import { useEffect, useState } from "react";
import { Heart, Bookmark, Send } from "lucide-react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getPostById,
  toggleLike,
  toggleSave,
  addComment,
} from "../services/post.sevice.js";

export default function PostDetail() {
  const { id } = useParams();
  const { user } = useAuth();

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
      fetchPost();
    }
  };

  const handleSave = async () => {
    setPost((prev) => ({
      ...prev,
      is_saved: !prev.is_saved,
    }));

    try {
      await toggleSave(id);
    } catch {
      fetchPost();
    }
  };

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
            content: commentText,
          },
          ...(prev.comments || []),
        ],
      }));

      setCommentText("");
    } catch {
      alert("Gagal kirim komentar");
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="text-zinc-400 p-6">Loading...</p>;
  if (!post) return <p className="text-zinc-400 p-6">Post kosong</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-zinc-200">
      {/* TITLE */}
      <h1 className="text-3xl font-bold text-white leading-tight">
        {post.title}
      </h1>

      {/* META */}
      <div className="flex items-center justify-between mt-3 pb-5 border-b border-zinc-800">
        <p className="text-sm text-zinc-400">
          by <span className="text-zinc-200">{post.username}</span> •{" "}
          {new Date(post.created_at).toLocaleDateString()}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleLike}
            className={`p-2 rounded-full transition ${
              post.is_liked ? "bg-red-600" : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            <Heart size={16} />
          </button>

          <button
            onClick={handleSave}
            className={`p-2 rounded-full transition ${
              post.is_saved
                ? "bg-yellow-600"
                : "bg-zinc-800 hover:bg-zinc-700"
            }`}
          >
            <Bookmark size={16} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <article
        className="prose prose-invert max-w-none mt-6"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* COMMENT */}
      <section className="mt-10 border-t border-zinc-800 pt-6">
        <h3 className="text-lg font-semibold mb-4">
          Komentar ({post.comments?.length || 0})
        </h3>

        {/* INPUT */}
        <form onSubmit={handleComment} className="mb-6">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows="3"
            placeholder="Tulis komentar..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:ring-2 focus:ring-orange-500 outline-none"
          />

          <div className="flex justify-end mt-3">
            <button
              type="submit"
              disabled={sending}
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm flex items-center gap-2"
            >
              <Send size={16} />
              {sending ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>

        {/* LIST */}
        <div className="space-y-4">
          {post.comments?.map((c) => (
            <div key={c.id} className="border-b border-zinc-800 pb-3">
              <p className="text-sm font-semibold text-orange-400">
                {c.username}
              </p>
              <p className="text-zinc-300">{c.content}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
