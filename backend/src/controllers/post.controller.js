import db from "../config/db.js";
import {
  createPostService,
  getApprovedPostsService,
  approvePostService
} from "../services/post.service.js";
/**
 * CREATE POST
 */
export const createPost = async (req, res) => {
  try {
    const { title, content, category_id } = req.body;

    if (!title || !content || !category_id) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    await createPostService(title, content, category_id, req.user.id);

    res.status(201).json({
      message: "Post dibuat, menunggu approve admin"
    });
  } catch (err) {
    console.error("CREATE POST ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * GET ALL POSTS (approved only)
 */
export const getPosts = async (req, res) => {
  try {
    const search = req.query.search?.toLowerCase().trim();
    let sql = `
      SELECT 
        posts.id,
        posts.title,
        posts.content,
        posts.created_at,
        users.username,
        categories.name AS category
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN categories ON posts.category_id = categories.id
      WHERE posts.status = 'approved'
    `;

    const params = [];

    if (search && search.length > 0) {
      sql += `
        AND (
          posts.title LIKE ?
          OR users.username LIKE ?
          OR categories.name LIKE ?
        )
      `;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    sql += ` ORDER BY posts.created_at DESC`;

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error("GET POSTS ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * GET POST BY ID
 */
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const [[post]] = await db.query(
      `
      SELECT 
        posts.*,
        users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      WHERE posts.id = ? AND posts.status = 'approved'
      `,
      [id]
    );

    if (!post) {
      return res.status(404).json({ message: "Post tidak ditemukan" });
    }

    const [comments] = await db.query(
      `
      SELECT 
        comments.id,
        comments.content,
        comments.created_at,
        users.username
      FROM comments
      JOIN users ON comments.user_id = users.id
      WHERE comments.post_id = ?
      ORDER BY comments.created_at DESC
      `,
      [id]
    );

    res.json({
      ...post,
      comments
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE POST (hanya pemilik)
 */
export const updatePost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    if (!title || !content) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    await db.query(
      "UPDATE posts SET title = ?, content = ?, updated_at = NOW() WHERE id = ?",
      [title, content, id]
    );

    res.json({ message: "Post berhasil diupdate" });
  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * DELETE POST (hanya pemilik)
 */
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM posts WHERE id = ?", [id]);

    res.json({ message: "Post berhasil dihapus" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
/**
 * APPROVED POST 
 */
export const getApprovedPosts = async (req, res) => {
  const search = req.query.search?.toLowerCase() || "";
  const page = Number(req.query.page) || 1;
  const limit = 4;
  const offset = (page - 1) * limit;

  let where = "WHERE posts.status = 'approved'";
  const params = [];

  if (search) {
    where += `
      AND (
        LOWER(posts.title) LIKE ?
        OR LOWER(users.username) LIKE ?
        OR LOWER(categories.name) LIKE ?
      )
    `;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  const [[countResult]] = await db.query(
    `
    SELECT COUNT(*) as total
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN categories ON posts.category_id = categories.id
    ${where}
    `,
    params
  );

  const totalPages = Math.ceil(countResult.total / limit);

  const [rows] = await db.query(
    `
    SELECT posts.*, users.username, categories.name AS category_name
    FROM posts
    JOIN users ON posts.user_id = users.id
    LEFT JOIN categories ON posts.category_id = categories.id
    ${where}
    ORDER BY posts.created_at DESC
    LIMIT ? OFFSET ?
    `,
    [...params, limit, offset]
  );

  res.json({
    data: rows,
    totalPages
  });
};
export const approvePost = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "UPDATE posts SET status = 'approved' WHERE id = ?",
      [id]
    );

    res.json({ message: "Post berhasil di-approve" });
  } catch (err) {
    console.error("APPROVE ERROR:", err);
    res.status(500).json({ message: "Approve gagal" });
  }
};
/**
 * GET BY CATEGORY
 **/
export const getPostsByCategory = async (req, res) => {
  const { categoryId } = req.params;

  const [posts] = await db.query(
    `SELECT posts.*, users.username
     FROM posts
     JOIN users ON posts.user_id = users.id
     WHERE posts.category_id = ? AND status = 'approved'`,
    [categoryId]
  );

  res.json(posts);
};
/** 
 * GET BY AUTHOR 
*/
export const getPostsByAuthor = async (req, res) => {
  try {
    const { username } = req.params;

    const [posts] = await db.query(
      `
      SELECT 
        posts.id,
        posts.title,
        posts.created_at,
        categories.name AS category
      FROM posts
      JOIN users ON posts.user_id = users.id
      LEFT JOIN categories ON posts.category_id = categories.id
      WHERE users.username = ?
      AND posts.status = 'approved'
      ORDER BY posts.created_at DESC
      `,
      [username]
    );

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllPostsAdmin = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT posts.*, users.username
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.created_at DESC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
