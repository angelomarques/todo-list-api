import express from "express";
import { authRouter } from "./auth.routes";
import { usersRouter } from "./user.routes";

export const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
