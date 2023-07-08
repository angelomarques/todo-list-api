import { NextFunction, Request, Response } from "express";
import { ResponseAuthenticatedLocalsType } from "./verifyAuthentication";
import { UpdateTaskByIdParamsType } from "../schemas/tasks.schema";
import { findTaskById } from "../services/tasks.service";

export const checkTaskOwnership = async (
  req: Request<UpdateTaskByIdParamsType>,
  res: Response<{}, ResponseAuthenticatedLocalsType>,
  next: NextFunction
) => {
  try {
    const {
      userPayload: { id: userId },
    } = res.locals;
    const { id: taskId } = req.params;

    const task = await findTaskById(taskId);

    if (!task || task?.userId !== userId) {
      return res.status(403).json("Unauthorized");
    }

    return next();
  } catch (err) {
    return res.status(500).json("Internal Server Error");
  }
};
