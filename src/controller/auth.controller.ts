import { NextFunction, Request, Response } from "express";
import {
  LoginUserRequestBodyType,
  RefreshTokenRequestBodyType,
  RegisterUserRequestBodyType,
} from "../schemas/auth.schema";
import {
  createUserByEmailAndPassword,
  findUserByEmail,
  findUserById,
} from "../services/users.service";

import { v4 as uuidv4 } from "uuid";
import { generateTokens, verifyJwt } from "../utils/jwt";
import {
  addRefreshTokenToWhitelist,
  deleteRefreshToken,
  findRefreshTokenById,
} from "../services/auth.service";

import bcrypt from "bcrypt";
import { hashToken } from "../utils/hashToken";

export const registerUserHandler = async (
  req: Request<{}, {}, RegisterUserRequestBodyType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const existingUser = await findUserByEmail(email);

    if (existingUser) {
      res.status(400);
      throw new Error("Email already in use.");
    }

    const user = await createUserByEmailAndPassword({
      email,
      password,
      firstName,
      lastName,
    });
    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserRequestBodyType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: user.id });

    return res.status(200).json({
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

export const refreshTokenHandler = async (
  req: Request<{}, {}, RefreshTokenRequestBodyType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.body;

    const payload = verifyJwt<{
      userId: string;
      jti: string;
    }>(refreshToken, "JWT_REFRESH_PUBLIC_KEY");

    if (!payload) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const savedRefreshToken = await findRefreshTokenById(payload.jti);

    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      user,
      jti
    );
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken: newRefreshToken,
      userId: user.id,
    });

    return res.status(200).json({
      accessToken,
      refreshToken: newRefreshToken,
    });
  } catch (err) {
    next(err);
  }
};
