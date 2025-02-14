import { NextFunction, Request, Response } from "express";
import { aj } from "../config/arcjet";
import logger from "../utils/logger";

export const arcjetMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          message: "Too many requests, please try again later",
        });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({
          message: "Bot detected, please try again later",
        });
      }
      return res.status(403).json({
        message: "Access denied",
      });
    }

    next();
  } catch (error) {
    logger.error(`Arcjet middleware error: ${error}`);
    next(error);
  }
};
