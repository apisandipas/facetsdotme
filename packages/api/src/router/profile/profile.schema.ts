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
  bio: z.string().optional(),
});

export const deleteProfileSchema = z.string();
