import express from "express";
import { validateResource } from "../middleware/validateResource";
import { createTaskSchema } from "../schemas/tasks.schema";
import {
  createTaskHandler,
  listTasksByUserIdHandler,
} from "../controller/tasks.controller";
import { verifyAuthentication } from "../middleware/verifyAuthentication";

export const tasksRouter = express.Router();

tasksRouter.post(
  "/:userId",
  validateResource(createTaskSchema),
  createTaskHandler
);
tasksRouter.get("/", verifyAuthentication, listTasksByUserIdHandler);
