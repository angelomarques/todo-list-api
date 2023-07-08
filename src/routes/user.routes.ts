import express, { NextFunction, Request, Response } from "express";
import {
  ResponseAuthenticatedLocalsType,
  verifyAuthentication,
} from "../middleware/verifyAuthentication";
import { findUserById } from "../services/users.service";
import {
  getUserHandler,
  updateUserHandler,
} from "../controller/users.controller";
import { validateResource } from "../middleware/validateResource";
import { updateUserSchema } from "../schemas/users.schema";

export const usersRouter = express.Router();

usersRouter.get("/profile", verifyAuthentication, getUserHandler);

usersRouter.put("/:id", validateResource(updateUserSchema), updateUserHandler);
