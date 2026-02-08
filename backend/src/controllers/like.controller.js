import { findLike, addLike, removeLike } from "../services/like.service.js";
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
