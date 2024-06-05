import { Request, Response, NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User";

const auth = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization;
    let foundToken;
    if (authToken?.startsWith("Bearer")) {
      foundToken = authToken
        .split("")
        .slice("Bearer".length + 1)
        .join("");
    } else if (authToken?.startsWith("JWT")) {
      foundToken = authToken
        .split("")
        .slice("JWT".length + 1)
        .join("");
    } else {
      res.status(400).json({ message: "Bearer or JWT token not set" });
      return;
    }

    if (!foundToken) {
      res.status(400).json({ message: "Bearer or JWT token not set" });
    }

    const verifyToken: any = jwt.verify(
      foundToken,
      process.env.SECRET_KEY as string
    );

    console.log(verifyToken);

    const user = await User.findOne({
      email: verifyToken.email,
      _id: verifyToken.id,
    }).select("password");

    if (!user) {
      res.status(404).json({ message: "Invalid token" });
      return;
    }

    // @ts-ignore
    req.user = user;
    next();
  }
);

export default auth;
