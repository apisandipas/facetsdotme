import { z } from "zod";

export const linkByIdSchema = z.object({
  id: z.string(),
});

export const linksByProfileIdSchema = z.object({
  profileId: z.string(),
});

export const createLinkSchema = z.object({
  profileId: z.string(),
  sortOrder: z.number(),
  text: z.string(),
  url: z.string(),
});

export const updateLinkSchema = z.object({
  id: z.string(),
  sortOrder: z.number(),
  text: z.string(),
  url: z.string(),
});

export const deleteLinkSchema = z.object({
  id: z.string(),
});

export const updateLinkSortOrderSchema = z.object({
  profileId: z.string(),
  links: z.array(
    z.object({
      id: z.string(),
      sortOrder: z.number(),
    }),
  ),
});

export type LinkByIdDto = z.TypeOf<typeof linkByIdSchema>;
export type LinksByProfileIdDto = z.TypeOf<typeof linksByProfileIdSchema>;
export type CreateLinkDto = z.TypeOf<typeof createLinkSchema>;
export type UpdateLinkDto = z.TypeOf<typeof updateLinkSchema>;
export type DeleteLinkDto = z.TypeOf<typeof deleteLinkSchema>;
export type UpdateLinkSortOrderDto = z.TypeOf<typeof updateLinkSortOrderSchema>;
