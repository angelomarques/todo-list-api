import { Request, Response } from "express";
import {
  CreateTaskRequestBodyType,
  CreateTaskRequestParamsType,
} from "../schemas/tasks.schema";
import { createTask } from "../services/tasks.service";

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
