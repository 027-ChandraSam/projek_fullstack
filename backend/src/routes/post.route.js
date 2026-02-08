import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getApprovedPosts,
  approvePost,
  getPostsByCategory,
  getPostsByAuthor,
  getAllPostsAdmin
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";

const router = express.Router();

// ================= CREATE =================
router.post("/", verifyToken, createPost);

// ================= UPDATE & DELETE =================
router.put("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

// ================= PUBLIC =================
router.get("/", getApprovedPosts);                // semua post approved
router.get("/category/:categoryId", getPostsByCategory);

// ================= ADMIN =================
router.get("/admin/all", verifyToken, isAdmin, getAllPostsAdmin);
router.patch("/:id/approve", verifyToken, isAdmin, approvePost);

// ================= SINGLE POST (PALING BAWAH) =================
router.get("/author/:username", getPostsByAuthor);
router.get("/:id", getPostById);


export default router;
