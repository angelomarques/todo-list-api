import { Request, Response } from "express";
import {
  CreateTaskRequestBodyType,
  CreateTaskRequestParamsType,
} from "../schemas/tasks.schema";
import { createTask, listTasksByUserId } from "../services/tasks.service";
import { ResponseAuthenticatedLocalsType } from "../middleware/verifyAuthentication";

export const createTaskHandler = async (
  req: Request<CreateTaskRequestParamsType, {}, CreateTaskRequestBodyType>,
  res: Response
) => {
  try {
    const { userId } = req.params;
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
