import { findSave, addSave, removeSave, findSavedPosts } from "../services/save.service.js";
export const toggleSave = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;

  const [rows] = await findSave(userId, postId);

  if (rows.length) {
    await removeSave(userId, postId);
    return res.json({ saved: false });
  }

  await addSave(userId, postId);
  res.json({ saved: true });
};

export const getSavedPosts = async (req, res) => {
  try {
    const userId = req.user.id;
    const posts = await findSavedPosts(userId);

    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal mengambil saved posts" });
  }
};
