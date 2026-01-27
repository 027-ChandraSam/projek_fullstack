import db from "../config/db.js";

export const findLike = (userId, postId) =>
  db.query(
    "SELECT id FROM post_likes WHERE user_id=? AND post_id=?",
    [userId, postId]
  );

export const addLike = (userId, postId) =>
  db.query(
    "INSERT INTO post_likes (user_id, post_id) VALUES (?,?)",
    [userId, postId]
  );

export const removeLike = (userId, postId) =>
  db.query(
    "DELETE FROM post_likes WHERE user_id=? AND post_id=?",
    [userId, postId]
  );
