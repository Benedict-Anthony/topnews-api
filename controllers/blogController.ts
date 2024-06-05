import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Blog from "../models/Blog";
import User from "../models/User";

class BlogController {
  createPost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // @ts-ignore
      const post = await Blog.create({ ...req.body, author: req.user._id });
      res.status(201).json(post);
    }
  );

  getAllPost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const posts = await Blog.find().populate({
        path: "author",
        select: "firstName lastName",
      });
      res.status(200).json(posts);
    }
  );

  getPost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const postId = req.params.id;

      const post = await Blog.findById(postId).populate({
        path: "author",
        select: "firstName lastName",
      });
      const user = await User.findById(post?.author);
      const author = `${user?.firstName} ${user?.lastName}`;
      if (!post) {
        res.status(404).json({ message: "Resource not found" });
        return;
      }
      res.status(200).json(post);
    }
  );
  updatePost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const postId = req.params.id;

      const post = await Blog.findByIdAndUpdate(
        postId,
        { ...req.body },
        { new: true, runValidators: true }
      );
      if (!post) {
        res.status(404).json({ message: "Resource not found" });
        return;
      }
      res.status(200).json(post);
    }
  );
  deletePost = expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const postId = req.params.id;

      const post = await Blog.findByIdAndDelete(postId);
      if (!post) {
        res.status(404).json({ message: "Resource not found" });
        return;
      }
      res.status(204).json({});
    }
  );
}

export default BlogController;
