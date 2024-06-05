import express, { Router } from "express";
import BlogController from "../controllers/blogController";
import auth from "../middleware/authMiddleware";

const blogRouter: Router = express.Router();
const blogController = new BlogController();

blogRouter
  .route("/")
  .post(auth, blogController.createPost)
  .get(blogController.getAllPost);

blogRouter
  .route("/:id")
  .get(blogController.getPost)
  .put(blogController.updatePost)
  .delete(blogController.deletePost);

export default blogRouter;
