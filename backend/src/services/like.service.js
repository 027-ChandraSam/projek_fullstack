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

  export const findLikedPosts = async (userId) => {
    try {
    
      
      // Validasi userId
      if (!userId || typeof userId !== 'number') {
        console.error('Invalid userId:', userId);
        return [];
      }
      
      const [rows] = await db.query(`
        SELECT posts.*
        FROM post_likes
        JOIN posts ON post_likes.post_id = posts.id
        WHERE post_likes.user_id = ?
        ORDER BY posts.created_at DESC
      `, [userId]);
      
    
      
      return rows;
    } catch (error) {
      console.error('Error in findLikedPosts:', error);
      throw error; // Pastikan error diteruskan ke controller
    }
  };
  
