import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", getUser);

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