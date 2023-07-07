import { PrismaClient } from "@prisma/client";
import { logger } from "./logger";

let db: PrismaClient;

declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

db = global.__db;

db.$use(async (params, next) => {
  const before = Date.now();

  const result = await next(params);

  const after = Date.now();

  logger.info(
    `Query ${params.model}.${params.action} took ${after - before}ms`
  );

  return result;
});

export { db };
