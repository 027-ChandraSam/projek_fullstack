import { createComment } from "../services/comment.service.js";

export const addComment = async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ message: "Komentar kosong" });
  }

  const [result] = await createComment(
    req.params.id,
    req.user.id,
    content
  );

  res.json({
    id: result.insertId,
    username: req.user.username,
    content,
  });
};
