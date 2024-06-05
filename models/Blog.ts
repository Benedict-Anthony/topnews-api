import mongoose from "mongoose";
import { BlogInterface } from "../types";

const BlogSchema = new mongoose.Schema<BlogInterface>(
  {
    title: {
      type: String,
      required: [true, "this field is required"],
    },
    content: {
      type: String,
      required: [true, "this field is required"],
    },
    author: {
      type: mongoose.SchemaTypes.ObjectId,
      required: [true, "this field is required"],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Blog = mongoose.model<BlogInterface>("Blog", BlogSchema);

export default Blog;
