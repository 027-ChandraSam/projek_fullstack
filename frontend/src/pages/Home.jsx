import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPosts = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/posts?search=${search}&page=${page}`
      );
      const data = await res.json();

      setPosts(data.data || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [search, page]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 text-zinc-200 space-y-6">
      {/* HEADER */}
      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-white">
          Community Article
        </h1>

        <p className="text-zinc-400">
          Temukan dan bagikan pengetahuan dengan komunitas.
        </p>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Cari artikel..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* POSTS */}
      {posts.length === 0 ? (
        <div className="text-center text-zinc-500 py-16">
          Tidak ada artikel ditemukan
        </div>
      ) : (
        <>
          <div className="divide-y divide-zinc-800">
            {posts.map((post) => (
              <div
                key={post.id}
                className="py-6 hover:bg-zinc-900/40 transition px-3 rounded-lg"
              >
                <a href={`/posts/${post.id}`}>
                  <h2 className="text-xl font-semibold text-white hover:text-orange-400">
                    {post.title}
                  </h2>
                </a>

                <div className="text-sm text-zinc-500 mt-1">
                  by {post.username} • {post.category_name}
                </div>

                <div
                  className="mt-3 text-zinc-300 text-sm line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                <div className="mt-3">
                  <a
                    href={`/posts/${post.id}`}
                    className="text-orange-400 text-sm hover:underline"
                  >
                    Read article →
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center pt-8">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                showFirstButton
                showLastButton
              />
            </Stack>
          </div>
        </>
      )}
    </div>
  );
}
