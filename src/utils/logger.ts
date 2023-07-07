import pino from "pino";
import { env } from "./env";

export const logger = pino({
  transport: {
    target: "pino-pretty",
  },
  level: env.NODE_ENV === "prod" ? "info" : "debug",
});
