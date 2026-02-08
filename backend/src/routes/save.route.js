// src/routes/save.route.js  
import express from "express";
import { getSavedPosts } from "../controllers/save.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getSavedPosts);

export default router;