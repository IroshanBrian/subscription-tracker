import { Router } from "express";
import { sentReminder } from "../controllers/workflow.controller";

const workflowRouter = Router();

workflowRouter.get("/", sentReminder);

export default workflowRouter;
