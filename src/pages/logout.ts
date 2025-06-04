import type { APIRoute } from "astro";
import { auth } from "@/lib/auth";

export const GET: APIRoute = async (ctx) => {
  const { success } = await auth.api.signOut({ headers: ctx.request.headers });

  if (!success) {
    console.error("Unable to successfully sign the user out");
  }

  return ctx.redirect("/");
};
