import express from "express";
import { verifyToken } from "../middleware/auth.middleware.js";
import { isAdmin } from "../middleware/role.middleware.js";
import {
  getUsers,
  deleteUser,
  updateUserRole,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getUsers);
router.put("/:id/role", verifyToken, isAdmin, updateUserRole);
router.delete("/:id", verifyToken,isAdmin,deleteUser);
 
export default router;
