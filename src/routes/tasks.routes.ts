import express from "express";
import { validateResource } from "../middleware/validateResource";
import {
  createTaskSchema,
  deleteTaskByIdSchema,
  updateTaskByIdSchema,
} from "../schemas/tasks.schema";
import {
  createTaskHandler,
  deleteTaskByIdHandler,
  listTasksByUserIdHandler,
  updateTaskByIdHandler,
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
  updateTaskByIdHandler
);

tasksRouter.delete(
  "/:id",
  verifyAuthentication,
  checkTaskOwnership,
  validateResource(deleteTaskByIdSchema),
  deleteTaskByIdHandler
);
