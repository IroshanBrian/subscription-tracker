import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
    res.send({
        title: "Get All User",
    });
});

userRouter.get("/:id", (req, res) => {
    res.send({
        title: "Get A User",
    });
});

userRouter.post("/", (req, res) => {
    res.send({
        title: "Create User",
    });
});

userRouter.put("/:id", (req, res) => {
    res.send({
        title: "Update A User",
    });
});

userRouter.delete("/:id", (req, res) => {
  res.send({
    title: "Delete A User",
  });
});

export default userRouter;