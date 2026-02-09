import db from "../config/db.js";

// CREATE POST (default: pending)
export const createPostService = async (
    title,
    content,
    categoryId,
    userId
  ) => {
    await db.query(
      `INSERT INTO posts 
       (title, content, category_id, user_id, status)
       VALUES (?, ?, ?, ?, 'pending')`,
      [title, content, categoryId, userId]
    );
  };

// GET APPROVED POSTS
export const getApprovedPostsService = async ({
    page = 1,
    limit = 10,
    search
  }) => {
    const offset = (page - 1) * limit;
  
    let sql = `
      FROM posts
      JOIN categories ON posts.category_id = categories.id
      JOIN users ON posts.user_id = users.id
      WHERE posts.status = 'approved'
    `;
  
    const params = [];
  
    if (search) {
      sql += " AND posts.title LIKE ?";
      params.push(`%${search}%`);
    }
  
    const [posts] = await db.query(
      `
      SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.created_at,
        categories.name AS category,
        users.username AS author
      ${sql}
      ORDER BY posts.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset]
    );
  
    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) AS total ${sql}`,
      params
    );
  
    return {
      posts,
      total
    };
  };
  
  

// APPROVE POST (ADMIN)
export const approvePostService = async (postId) => {
    const [result] = await db.query(
        "UPDATE posts SET status = 'approved' WHERE id = ?",
        [postId]
    );
    return result;
};

