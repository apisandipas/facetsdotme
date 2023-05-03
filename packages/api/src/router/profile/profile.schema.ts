import { z } from "zod";

export const profileByHandleSchema = z.object({
  handle: z.string({
    required_error: "Handle is required",
  }),
});

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

export type ProfileByHandleDto = z.TypeOf<typeof profileByHandleSchema>;
export type ProfileByIdDto = z.TypeOf<typeof profileByIdSchema>;
export type ProfileByUserIdDto = z.TypeOf<typeof profileByUserIdSchema>;
export type CreateProfileDto = z.TypeOf<typeof createProfileSchema>;
export type DeleteProfileDto = z.TypeOf<typeof deleteProfileSchema>;
