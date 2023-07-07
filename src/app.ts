import express from "express";
import { env } from "./utils/env";
import { logger } from "./utils/logger";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(router);

const port = env.PORT;

app.listen(port, () => {
  logger.info(`App started at http://localhost:${port}`);
});
