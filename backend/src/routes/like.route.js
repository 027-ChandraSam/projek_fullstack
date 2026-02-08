// src/routes/like.route.js
import express from "express";
import { getLikedPosts } from "../controllers/like.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getLikedPosts);

export default router;