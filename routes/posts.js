import express from "express";
import { getUser } from "../controllers/users.js";
import { getAllPost,getPost,insertPost } from "../controllers/post.js";
import { verifyToken } from "../middleware/auth.js"

const routes = express.Router();

// routes.get("/:id",verifyToken,getUser)
// routes.get("/post/:id",verifyToken,getPost)
routes.get("/",verifyToken,getAllPost)
// routes.post("/post/:id",verifyToken,insertPost)

export default routes;

