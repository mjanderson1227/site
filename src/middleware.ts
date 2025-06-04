import { auth } from "@/lib/auth";
import { defineMiddleware } from "astro:middleware";

const publicRoutes = [/\//, /\/login/, /\/register/, /\/api.+/];

export const onRequest = defineMiddleware(async (context, next) => {
  const isAuthed = await auth.api.getSession({
    headers: context.request.headers,
  });

  if (isAuthed) {
    context.locals.user = isAuthed.user;
    context.locals.session = isAuthed.session;

    if (
      context.url.pathname.startsWith("/dashboard") &&
      isAuthed.user.role !== "admin"
    ) {
      return context.redirect("/");
    }
  } else {
    context.locals.user = null;
    context.locals.session = null;

    if (!publicRoutes.some((pattern) => context.url.pathname.match(pattern))) {
      return context.redirect("/");
    }
  }

  return next();
});
