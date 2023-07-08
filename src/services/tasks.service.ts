import { Task } from "@prisma/client";
import { db } from "../utils/db.server";

export function createTask(data: Pick<Task, "title" | "userId">) {
  return db.task.create({ data });
}

export function listTasksByUserId(userId: string) {
  return db.task.findMany({
    where: {
      userId,
    },
  });
}

export function updateTaskById(
  id: string,
  data: { title: string; completed?: boolean }
) {
  return db.task.update({
    where: { id },
    data,
  });
}

export function findTaskById(id: string) {
  return db.task.findUnique({ where: { id } });
}

export function deleteTaskById(id: string) {
  return db.task.delete({ where: { id } });
}
