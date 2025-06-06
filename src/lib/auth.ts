import { betterAuth } from "better-auth";
import { admin } from "better-auth/plugins";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/client";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "sqlite",
  }),
  plugins: [admin()],
});

export type User = (typeof auth.$Infer.Session)["user"];
export type Session = (typeof auth.$Infer.Session)["session"];
