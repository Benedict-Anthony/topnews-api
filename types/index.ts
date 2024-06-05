import { Document, ObjectId } from "mongoose";

export interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface BlogInterface extends Document {
  title: string;
  content: string;
  author: ObjectId;
}
