import { TypeOf, z } from "zod";

export const updateUserSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: "First Name is required" }),
    lastName: z.string({ required_error: "Last Name is required" }),
  }),
});

export type UpdateUserRequestBodyType = TypeOf<typeof updateUserSchema>["body"];
