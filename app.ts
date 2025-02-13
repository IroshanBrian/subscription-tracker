import express from "express";
import { PORT } from "./config/env";
import subscriptionRouter from "./routes/subscription.routes";
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
import logger from "./utils/logger";
import connectDB from "./database/mongoDB";
import errorMiddleware from "./middleware/error.middleware";
import cookieParser from "cookie-parser";
import { arcjetMiddleware } from "./middleware/arcjet.middleware";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(arcjetMiddleware);

app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Welcome to Subscription Service");
});

app.listen(PORT, async () => {
  logger.info(`Server is running on port http://localhost:${PORT}`);
  await connectDB();
});

export default app;
