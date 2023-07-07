import { NextFunction, Request, Response } from "express";
import { ResponseAuthenticatedLocalsType } from "../middleware/verifyAuthentication";
import { findUserById } from "../services/users.service";

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
