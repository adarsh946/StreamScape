import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers["authorization"] as string;
    const token = header?.split(" ")[1];

    const isValid = jwt.verify(token, process.env.JWT_SECRET!);
    if (!isValid) {
      res.status(403).json({
        message: "Unauthorised User",
      });
    }
    next();
  } catch (error) {
    res.status(403).json({
      message: "Unauthorised User",
      error,
    });
  }
};
