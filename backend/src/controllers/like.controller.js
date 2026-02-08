import { findLike, addLike, removeLike, findLikedPosts } from "../services/like.service.js";
export const toggleLike = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  const [rows] = await findLike(userId, postId);

  if (rows.length) {
    await removeLike(userId, postId);
    return res.json({ liked: false });
  }

  await addLike(userId, postId);
  res.json({ liked: true });
};

export const getLikedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await findLikedPosts(userId);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil liked posts" });
  } 
};
