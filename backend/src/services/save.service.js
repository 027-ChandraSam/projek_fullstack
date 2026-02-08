import db from "../config/db.js";

export const findSave = (userId, postId) =>
  db.query(
    "SELECT id FROM post_saves WHERE user_id=? AND post_id=?",
    [userId, postId]
  );

export const addSave = (userId, postId) =>
  db.query(
    "INSERT INTO post_saves (user_id, post_id) VALUES (?,?)",
    [userId, postId]
  );

export const removeSave = (userId, postId) =>
  db.query(
    "DELETE FROM post_saves WHERE user_id=? AND post_id=?",
    [userId, postId]
  );

  export const findSavedPosts = async (userId) => {
    const [rows] = await db.query(`
      SELECT p.*
      FROM post_saves ps
      JOIN posts p ON ps.post_id = p.id
      WHERE ps.user_id = ?
      ORDER BY p.created_at DESC
    `, [userId]);
  
    return rows;
  };
  

