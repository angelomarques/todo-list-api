import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { env } from "./env";

export const signJwtToken = (
  payload: User | { userId: string; jti?: string },
  keyName: "JWT_ACCESS_PRIVATE_KEY" | "JWT_REFRESH_PRIVATE_KEY",
  options?: jwt.SignOptions
) => {
  const signingKey = Buffer.from(env[keyName], "base64").toString("ascii");

  return jwt.sign(payload, signingKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const generateRefreshToken = (user: User, jti: string) => {
  const signingKey = Buffer.from(
    env.JWT_REFRESH_PRIVATE_KEY,
    "base64"
  ).toString("ascii");

  return jwt.sign({ userId: user.id, jti }, signingKey, {
    algorithm: "RS256",
  });
};

export const generateTokens = (user: User, jti: string) => {
  const accessToken = signJwtToken(user, "JWT_ACCESS_PRIVATE_KEY", {
    expiresIn: "1y",
  });
  const refreshToken = signJwtToken(
    { userId: user.id, jti },
    "JWT_REFRESH_PRIVATE_KEY",
    { expiresIn: "15m" }
  );

  return { accessToken, refreshToken };
};

export const verifyJwt = <T>(
  token: string,
  keyName: "JWT_ACCESS_PUBLIC_KEY" | "JWT_REFRESH_PUBLIC_KEY"
) => {
  try {
    const publicKey = Buffer.from(env[keyName], "base64").toString("ascii");
    
    const decoded = jwt.verify(token, publicKey) as T;

    return decoded;
  } catch (e) {
    console.log("errrrorr", e);

    return null;
  }
};
