import db from "../config/db.js";

export const createComment = (postId, userId, content) =>
  db.query(
    "INSERT INTO comments (post_id, user_id, content) VALUES (?,?,?)",
    [postId, userId, content]
  );

export const getCommentsByPost = (postId) =>
  db.query(
    `
    SELECT comments.id, comments.content, users.username
    FROM comments
    JOIN users ON comments.user_id = users.id
    WHERE comments.post_id = ?
    ORDER BY comments.created_at DESC
    `,
    [postId]
  );
