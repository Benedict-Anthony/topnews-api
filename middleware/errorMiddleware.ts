import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

const errorHandler = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // @ts-ignore
  const errorName = err.name;
  console.log(errorName);
  console.log(err);

  // @ts-ignore
  const errors = { ...err.errors };

  // console.log(err);

  switch (errorName) {
    case "ValidationError":
      const errorMessages = Object.keys(errors).map(
        (field: string) => `${field} is required`
      );
      res.status(400).json({ success: false, errorMessages });
      return;

    case "MongoServerError":
      // @ts-ignore
      const code = err.code;
      // @ts-ignore
      const duplicateVlaue = Object.keys(err.keyValue)[0];

      if (code === 11000) {
        res.status(400).json({
          messgae: `duplicate value. ${duplicateVlaue} already exist`,
        });
      }
      return;

    case "JsonWebTokenError":
      return res.status(403).json({ message: "invalid token" });
    case "MongooseError":
      return res.status(501).json({ message: "Something went wrong" });
    case "CastError":
      return res.status(404).json({ message: "Resource not found" });

    default:
      res.status(500).json({ success: false, message: "something went wrong" });
      return;
  }
};

export default errorHandler;
