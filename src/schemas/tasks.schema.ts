import { TypeOf, z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Task Title Required" }),
  }),
});

export type CreateTaskRequestBodyType = TypeOf<typeof createTaskSchema>["body"];
