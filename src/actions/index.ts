import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { db } from "@/db/client";
import { blog } from "@/db/schema/blog-schema";
import { uploadClient as bucket } from "@/lib/storage";

export const server = {
  createPost: defineAction({
    input: z.object({
      title: z.string().min(1, "Title is required"),
      content: z.any(),
    }),
    handler: async ({ title, content }, ctx) => {
      const { user } = ctx.locals;

      if (!user || user.role !== "admin") {
        throw new ActionError({
          code: "UNAUTHORIZED",
          message: "You must be logged in as an admin to create a post.",
        });
      }

      try {
        const uploadFileName = `${title.replace(/[\s_]+/g, "-").toLowerCase()}.json`;
        const file = bucket.file(
          uploadFileName,
          { type: "application/json", acl: "public-read" },
        );

        const bytesWritten = await file.write(JSON.stringify(content), {
          type: "application/json",
        });

        await db.insert(blog).values({
          title,
          content: JSON.,
          authorId: user.id,
        });
      } catch (error) {
        console.error("Error creating post:", error);

        throw new ActionError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create post. Please try again later.",
        });
      }
    },
  }),
};
