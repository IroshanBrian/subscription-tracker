import { Router } from "express";
import { getUser, getUsers } from "../controllers/user.controller";
import { authorize } from "../middleware/auth.middleware";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

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