import express, { NextFunction, Request, Response } from "express";
import {
  ResponseAuthenticatedLocalsType,
  verifyAuthentication,
} from "../middleware/verifyAuthentication";
import { findUserById } from "../services/users.service";
import { getUserHandler } from "../controller/user.controller";

export const usersRouter = express.Router();

usersRouter.get("/profile", verifyAuthentication, getUserHandler);
