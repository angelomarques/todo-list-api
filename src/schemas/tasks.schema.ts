import { TypeOf, z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Task Title Required" }),
  }),
  params: z.object({
    userId: z.string({ required_error: "User id is required" }),
  }),
});

export type CreateTaskRequestBodyType = TypeOf<typeof createTaskSchema>["body"];
export type CreateTaskRequestParamsType = TypeOf<
  typeof createTaskSchema
>["params"];
