import { Router } from "express";
import { authorize } from "../middleware/auth.middleware";
import {
  createSubscription,
  getUserSubscriptions,
} from "../controllers/subscription.controller";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getUserSubscriptions);

subscriptionRouter.get("/:id", (req, res) => {
  res.send({
    title: "Get A Subscription",
  });
});

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send({
    title: "Update A Subscription",
  });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({
    title: "Delete A Subscription",
  });
});

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({
    title: "Cancel A Subscription",
  });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({
    title: "Get Upcoming Renewals",
  });
});



export default subscriptionRouter;