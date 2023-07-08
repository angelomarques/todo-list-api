import { TypeOf, z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is Required" }),
    password: z
      .string({ required_error: "Password is Required" })
      .min(6, "Password is too short - should be min 6 chars"),
    firstName: z.string({ required_error: "First Name is required" }),
    lastName: z.string({ required_error: "Last Name is required" }),
  }),
});

export const loginUserSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is Required" }),
    password: z
      .string({ required_error: "Password is Required" })
      .min(6, "Password is too short - should be min 6 chars"),
  }),
});

export const refreshTokenSchema = z.object({
  body: z.object({
    refreshToken: z.string({ required_error: "Refresh Token is required" }),
  }),
});

export type RegisterUserRequestBodyType = TypeOf<
  typeof registerUserSchema
>["body"];

export type LoginUserRequestBodyType = TypeOf<typeof loginUserSchema>["body"];

export type RefreshTokenRequestBodyType = TypeOf<
  typeof refreshTokenSchema
>["body"];
