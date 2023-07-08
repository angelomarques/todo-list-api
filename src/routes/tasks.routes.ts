import express from "express";
import { validateResource } from "../middleware/validateResource";
import {
  createTaskSchema,
  updateTaskByIdSchema,
} from "../schemas/tasks.schema";
import {
  createTaskHandler,
  listTasksByUserIdHandler,
  updateTaskByUserIdHandler,
} from "../controller/tasks.controller";
import { verifyAuthentication } from "../middleware/verifyAuthentication";
import { checkTaskOwnership } from "../middleware/checkTaskOwnership";

export const tasksRouter = express.Router();

tasksRouter.post(
  "/",
  verifyAuthentication,
  validateResource(createTaskSchema),
  createTaskHandler
);

tasksRouter.get("/", verifyAuthentication, listTasksByUserIdHandler);

tasksRouter.put(
  "/:id",
  verifyAuthentication,
  checkTaskOwnership,
  validateResource(updateTaskByIdSchema),
  updateTaskByUserIdHandler
);
