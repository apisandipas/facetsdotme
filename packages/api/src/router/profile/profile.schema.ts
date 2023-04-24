import { z } from "zod";

export const profileByIdSchema = z.object({
  id: z.string(),
});

export const profileByUserIdSchema = z.object({
  userId: z.string(),
});

export const createProfileSchema = z.object({
  userId: z.string(),
  handle: z.string({
    required_error: "Handle is required",
  }),
  bio: z.string(),
  links: z.array(
    z.object({
      text: z.string(),
      url: z.string(),
    }),
  ),
});

export const deleteProfileSchema = z.string();
