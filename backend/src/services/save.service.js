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
