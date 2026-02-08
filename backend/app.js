import  express from "express";
import cors from "cors";
import authRoutes from "../backend/src/routes/auth.route.js";
import postRoutes from "../backend/src/routes/post.route.js";
import interactionRoutes from "../backend/src/routes/interaction.route.js";
import  getCategories  from "./src/controllers/category.controller.js";
import likeRoutes from "./src/routes/like.route.js"; 
import saveRoutes from "./src/routes/save.route.js"; 




const app = express ();
app.use(cors());
app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/posts", interactionRoutes);
app.use("/api/categories", getCategories);
app.use("/api/likes",likeRoutes );
app.use("/api/saves",saveRoutes);

export default app;
