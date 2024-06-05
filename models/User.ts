import mongoose from "mongoose";
import { UserInterface } from "../types";
import bcryptjs from "bcryptjs";
const UserSchema = new mongoose.Schema<UserInterface>({
  firstName: {
    type: String,
    required: [true, "this field is required"],
  },
  lastName: {
    type: String,
    required: [true, "this field is required"],
  },
  email: {
    type: String,
    required: [true, "this field is required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      "invalid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "this field is required"],
    select: false,
  },
});
UserSchema.pre("save", function (next) {
  const salt = bcryptjs.genSaltSync(10);
  const hashPassword = bcryptjs.hashSync(this.password, salt);
  this.password = hashPassword;
  next();
});
const User = mongoose.model<UserInterface>("User", UserSchema);
export default User;
