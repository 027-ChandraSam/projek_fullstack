import { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contentHtml = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    );

    if (!title || !contentHtml || !categoryId) {
      return alert("Semua field wajib diisi");
    }

    try {
      setLoading(true);
      await api.post("/posts", {
        title,
        content: contentHtml,
        category_id: categoryId,
      });

      alert("Post berhasil dibuat, menunggu approve admin");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-zinc-200">
      <h1 className="text-2xl font-bold mb-6">Buat Postingan</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* TITLE */}
        <input
          type="text"
          placeholder="Judul postingan"
          className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* CATEGORY */}
        <select
          className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Pilih kategori</option>
          <option value="1">Teknologi</option>
          <option value="2">Programming</option>
          <option value="3">Opini</option>
        </select>

        {/* EDITOR */}
        <div className="bg-zinc-900 border border-zinc-700 rounded">
          <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            placeholder="Tulis konten di sini..."
            toolbarClassName="border-b border-zinc-700"
            editorClassName="p-4 min-h-[300px]"
          />
        </div>

        {/* SUBMIT */}
        <button
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded font-semibold"
        >
          {loading ? "Mengirim..." : "Publish"}
        </button>
      </form>
    </div>
  );
}
