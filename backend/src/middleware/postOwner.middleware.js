import db from "../config/db.js";

export const isPostOwnerOrAdmin = async (req, res, next) => {
  const postId = req.params.id;
  const user = req.user;

  const [rows] = await db.query(
    "SELECT user_id FROM posts WHERE id = ?",
    [postId]
  );

  if (rows.length === 0) {
    return res.status(404).json({ message: "Post tidak ditemukan" });
  }

  if (rows[0].user_id !== user.id && user.role !== "admin") {
    return res.status(403).json({ message: "Bukan pemilik post" });
  }

  next();
};
