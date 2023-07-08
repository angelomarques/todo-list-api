import { NextFunction, Request, Response } from "express";
import { ResponseAuthenticatedLocalsType } from "../middleware/verifyAuthentication";
import { findUserById, updateUserById } from "../services/users.service";
import {
  UpdateUserRequestBody,
  UpdateUserRequestParams,
} from "../schemas/users.schema";

export const getUserHandler = async (
  req: Request,
  res: Response<{}, ResponseAuthenticatedLocalsType>,
  next: NextFunction
) => {
  try {
    const { id: userId } = res.locals.userPayload;

    const user = await findUserById(userId);

    if (!user) throw new Error("Can not find user");

    const { password, ...filteredUser } = user;

    return res.status(200).json(filteredUser);
  } catch (err) {
    next(err);
  }
};

export const updateUserHandler = async (
  req: Request<UpdateUserRequestParams, {}, UpdateUserRequestBody>,
  res: Response
) => {
  try {
    const { id: userId } = req.params;
    const { firstName, lastName } = req.body;

    const newUser = await updateUserById(userId, { firstName, lastName });

    if (!newUser) return res.status(500).json("An error occurred");

    const { password, ...filteredUser } = newUser;

    return res.status(200).json(filteredUser);
  } catch (err) {
    return res.status(500).json("An error occurred");
  }
};
