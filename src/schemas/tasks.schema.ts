import { TypeOf, z } from "zod";

export const createTaskSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Task Title is Required" }),
  }),
});

export const updateTaskByIdSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Task Title is Required" }),
    completed: z.boolean().optional(),
  }),
  params: z.object({
    id: z.string({ required_error: "Task Id is required" }),
  }),
});

export const deleteTaskByIdSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Task Id is required" }),
  }),
});

export type CreateTaskRequestBodyType = TypeOf<typeof createTaskSchema>["body"];

export type UpdateTaskByIdBodyType = TypeOf<
  typeof updateTaskByIdSchema
>["body"];
export type UpdateTaskByIdParamsType = TypeOf<
  typeof updateTaskByIdSchema
>["params"];

export type DeleteTaskByIdParamsType = TypeOf<
  typeof deleteTaskByIdSchema
>["params"];
