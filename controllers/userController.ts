import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/User";
import { generateToken } from "../utils/token";
import bcryptjs from "bcryptjs";

class UserController {
  createUser = expressAsyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = await User.create(req.body);
      const token = generateToken(user._id as string, user.email);
      res.status(201).json({ user, token });
    }
  );
  logInUser = expressAsyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const { email, password } = req.body;

      if (!email) {
        res.status(400).json({ message: "Please provide email and password" });
        return;
      }

      const user = await User.findOne({ email }).select("password");
      if (!user) {
        res.status(404).json({ message: "invalid credentials" });
        return;
      }

      const passwordValid = bcryptjs.compareSync(password, user.password);
      if (!passwordValid) {
        res.status(404).json({ message: "invalid credentials" });
        return;
      }

      const token = generateToken(user._id as string, user.email);

      res.status(200).json({ success: true, token, user });
    }
  );

  getUser = expressAsyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      // @ts-ignore
      const user = await User.findById(req.user._id);
      res.status(200).json(user);
    }
  );
  updateUser = expressAsyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      const user = await User.findByIdAndUpdate(
        // @ts-ignore
        req.user._id,
        { ...req.body },
        { new: true, runValidators: true }
      );
      res.status(200).json(user);
    }
  );
  deleteUser = expressAsyncHandler(
    async (req: Request, res: Response, _next: NextFunction) => {
      // @ts-ignore
      const user = await User.findByIdAndDelete(req.user._id);
      res.status(200).json({});
    }
  );
}

export default UserController;
