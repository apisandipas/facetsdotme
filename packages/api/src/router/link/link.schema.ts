import { z } from "zod";

export const linkByIdSchema = z.object({
  id: z.string(),
});

export const linksByProfileIdSchema = z.object({
  profileId: z.string(),
});

export const createOrUpdateLinksSchema = z.object({
  profileId: z.string(),
  links: z.array(
    z.object({
      id: z.string().optional(),
      text: z.string(),
      url: z.string(),
    }),
  ),
});
