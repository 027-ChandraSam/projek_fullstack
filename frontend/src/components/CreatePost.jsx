import { useState, useEffect } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ConfirmModal from "../components/ConfirmModal";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Gagal ambil kategori", err);
      }
    };

    fetchCategories();
  }, []);
  const [modal, setModal] = useState({
    open: false,
    message: "",
    success: false,
  });



  const handleSubmit = async (e) => {
    e.preventDefault();

    const contentHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    if (!title || !contentHtml || !categoryId) {
      return setModal({
        open: true,
        message: "Semua field wajib diisi",
      });
    }

    try {
      setLoading(true);
      await api.post("/posts", {
        title,
        content: contentHtml,
        category_id: categoryId,
      });

      setModal({
        open: true,
        message: "Post berhasil dibuat, menunggu approve admin",
        success: true,
      });
    } catch (err) {
      console.error(err);
      setModal({
        open: true,
        message: "Gagal membuat post",
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200">

      {/* TOP BAR */}
      <div className="border-b border-zinc-800 bg-zinc-900 px-8 py-4 flex justify-between items-center">
        <h1 className="text-white font-semibold text-lg">Create Post</h1>

        <button
          type="submit"
          form="createPostForm"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-700 transition px-5 py-2 rounded-lg font-semibold text-white disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto p-8">
        <form id="createPostForm" onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <input
            type="text"
            placeholder="Judul postingan..."
            className="w-full text-3xl font-bold bg-transparent border-none outline-none placeholder-zinc-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* CATEGORY */}
          <select
            className="bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-lg text-sm"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Pilih kategori</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* EDITOR CARD */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg">
            <Editor
              editorState={editorState}
              onEditorStateChange={setEditorState}
              placeholder="Tulis cerita atau ide kamu di sini..."
              toolbarClassName="border-b border-zinc-800 bg-zinc-900"
              editorClassName="p-6 min-h-[400px]"
            />
          </div>

        </form>
      </div>

      <ConfirmModal
        open={modal.open}
        title={modal.message}
        onConfirm={() => {
          setModal({ open: false });
          if (modal.success) navigate("/");
        }}
        onCancel={() => setModal({ open: false })}
      />

    </div>

  );

}
