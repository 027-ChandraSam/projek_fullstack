import { findSave, addSave, removeSave } from "../services/save.service.js";
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
