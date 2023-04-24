import { z } from "zod";

export const postByIdSchema = z.object({ id: z.string() });

export const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

// TODO is this right?
export const deletePostSchema = z.string();
