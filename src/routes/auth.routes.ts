import express, { NextFunction, Request, Response } from "express";
import { validateResource } from "../middleware/validateResource";
import {
  loginUserSchema,
  refreshTokenSchema,
  registerUserSchema,
} from "../schemas/auth.schema";
import {
  loginUserHandler,
  refreshTokenHandler,
  registerUserHandler,
} from "../controller/auth.controller";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  validateResource(registerUserSchema),
  registerUserHandler
);

authRouter.post("/login", validateResource(loginUserSchema), loginUserHandler);

authRouter.post(
  "/refreshToken",
  validateResource(refreshTokenSchema),
  refreshTokenHandler
);

// This endpoint is only for demo purpose.
// Move this logic where you need to revoke the tokens( for ex, on password reset)
// router.post('/revokeRefreshTokens', async (req, res, next) => {
//   try {
//     const { userId } = req.body;
//     await revokeTokens(userId);
//     res.json({ message: `Tokens revoked for user with id #${userId}` });
//   } catch (err) {
//     next(err);
//   }
// });
