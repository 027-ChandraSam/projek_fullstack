import { useEffect, useState } from "react";
import api from "../services/api";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/posts")
      .then((res) => setPosts(res.data))
      .catch(() => console.log("Gagal amil post"));
  }, []);

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-zinc-800 border border-zinc-700 rounded p-4 hover:bg-zinc-700 transition"
        >
            <a href={`/posts/${post.id}`}>
            <h2 className="text-lg font-bold text-zinc-100">
            {post.title}
          </h2>
            </a>
          
          <p className="text-zinc-400 text-sm">
            by <a href="/posts/author/username">{post.username}</a>
          </p>
          <p className="mt-2 text-zinc-300 line-clamp-3"
           dangerouslySetInnerHTML={{ __html: post.content }}>
          </p>
        </div>
      ))}
    </div>
  );
}
