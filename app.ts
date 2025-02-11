import express from "express";
import { PORT } from "./config/env";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Subscription Service");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

export default app;
