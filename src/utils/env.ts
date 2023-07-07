import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

let schema = z.object({
  PORT: z.string().nonempty(),
  NODE_ENV: z.enum(["dev", "test", "prod"]),
  JWT_ACCESS_PRIVATE_KEY: z.string().nonempty(),
  JWT_ACCESS_PUBLIC_KEY: z.string().nonempty(),
  JWT_REFRESH_PRIVATE_KEY: z.string().nonempty(),
  JWT_REFRESH_PUBLIC_KEY: z.string().nonempty(),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid environment variables:",
    JSON.stringify(parsed.error.format(), null, 4)
  );
  process.exit(1);
}

export const env = parsed.data;
