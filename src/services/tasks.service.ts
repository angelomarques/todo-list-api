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
