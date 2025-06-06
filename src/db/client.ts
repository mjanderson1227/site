import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

import * as authSchema from "./schema/auth-schema";
import * as blogSchema from "./schema/blog-schema";

const client = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN!,
});

export const db = drizzle({
  client,
  schema: {
    ...authSchema,
    ...blogSchema,
  },
});
