import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send({
    title: "Get All Subscription",
  });
});

subscriptionRouter.get("/:id", (req, res) => {
  res.send({
    title: "Get A Subscription",
  });
});

subscriptionRouter.post("/", (req, res) => {
  res.send({
    title: "Create A Subscription",
  });
});

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

subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({
    title: "Get all user Subscriptions",
  });
});

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