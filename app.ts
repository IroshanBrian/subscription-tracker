import express from "express";
import { PORT } from "./config/env";
import subscriptionRouter from "./routes/subscription.routes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";

const app = express();

app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.get("/", (req, res) => {
  res.send("Welcome to Subscription Service");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;
