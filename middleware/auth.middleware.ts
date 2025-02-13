import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";

interface AuthRequest extends Request {
  user?: any;
}
export const authorize = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      const error: any = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, JWT_SECRET as string);

    let user;
    if (typeof decoded !== "string" && "userId" in decoded) {
      user = await User.findById(decoded.userId);
    } else {
      const error: any = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    if (!user) {
      const error: any = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    req.user = user;

    next();
  } catch (error) {
    const err = error as any;
    res.status(401).json({
      message: "Unauthorized",
    });
  }
};
