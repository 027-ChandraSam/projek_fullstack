import express from "express";
import { toggleLike } from "../controllers/like.controller.js";
import { toggleSave } from "../controllers/save.controller.js";
import { addComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/:id/like", verifyToken, toggleLike);
router.post("/:id/save", verifyToken, toggleSave);
router.post("/:id/comments", verifyToken, addComment);




export default router;
