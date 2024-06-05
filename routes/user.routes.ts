import express, { Router } from "express";
import UserController from "../controllers/userController";
import auth from "../middleware/authMiddleware";

const userRouter: Router = express.Router();
const userController = new UserController();

userRouter
  .route("/")
  .post(userController.createUser)
  .get(auth, userController.getUser)
  .put(auth, userController.updateUser)
  .delete(auth, userController.deleteUser);

userRouter.post("/login", userController.logInUser);

export default userRouter;
