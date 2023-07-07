import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../utils/env";
import { verifyJwt } from "../utils/jwt";
import { User } from "@prisma/client";

export const verifyAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers as { authorization: string };

  if (!authorization) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  try {
    const token = authorization.split(" ")[1];

    const payload = verifyJwt<User & { iat: number; exp: number }>(
      token,
      "JWT_ACCESS_PUBLIC_KEY"
    );

    if (!payload) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    res.locals.userPayload = payload;
  } catch (err: any) {
    res.status(401);

    if (err.name === "TokenExpiredError") {
      throw new Error(err.name);
    }

    throw new Error("Unauthorized");
  }

  return next();
};

export type ResponseAuthenticatedLocalsType = {
  userPayload: User & { iat: number; exp: number };
};
