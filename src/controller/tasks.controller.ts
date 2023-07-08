import { Request, Response } from "express";
import {
  CreateTaskRequestBodyType,
  DeleteTaskByIdParamsType,
  UpdateTaskByIdBodyType,
  UpdateTaskByIdParamsType,
} from "../schemas/tasks.schema";
import {
  createTask,
  deleteTaskById,
  listTasksByUserId,
  updateTaskById,
} from "../services/tasks.service";
import { ResponseAuthenticatedLocalsType } from "../middleware/verifyAuthentication";

export const createTaskHandler = async (
  req: Request<{}, {}, CreateTaskRequestBodyType>,
  res: Response<{}, ResponseAuthenticatedLocalsType>
) => {
  try {
    const {
      userPayload: { id: userId },
    } = res.locals;
    const { title } = req.body;

    const task = await createTask({ userId, title });

    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json("An error occurred");
  }
};

export const listTasksByUserIdHandler = async (
  req: Request,
  res: Response<{}, ResponseAuthenticatedLocalsType>
) => {
  try {
    const {
      userPayload: { id: userId },
    } = res.locals;

    const tasks = await listTasksByUserId(userId);

    if (!tasks) return res.status(500).json("An error occurred");

    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json("An error occurred");
  }
};

export const updateTaskByIdHandler = async (
  req: Request<UpdateTaskByIdParamsType, {}, UpdateTaskByIdBodyType>,
  res: Response
) => {
  try {
    const { id: taskId } = req.params;
    const { title, completed } = req.body;

    const newTask = await updateTaskById(taskId, { title, completed });

    return res.status(200).json(newTask);
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
};

export const deleteTaskByIdHandler = async (
  req: Request<DeleteTaskByIdParamsType>,
  res: Response
) => {
  try {
    const { id: taskId } = req.params;

    await deleteTaskById(taskId);

    return res.status(200).json("Task successfully deleted");
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
};
