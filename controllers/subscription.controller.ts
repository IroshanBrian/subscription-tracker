import { Request, NextFunction, Response } from "express";
import Subscription from "../models/subscription.model";

interface AuthRequest extends Request {
  user?: { _id: string };
}

export const createSubscription = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });

    return;
  } catch (error) {
    next(error);
  }
};


export const getUserSubscriptions = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const subscriptions = await Subscription.find({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "User subscriptions fetched successfully",
      data: subscriptions,
    });

    return;
  } catch (error) {
    next(error);
  }
};

export const getSubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      res.status(404).json({
        success: false,
        message: "Subscription not found",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "User subscriptions fetched successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};