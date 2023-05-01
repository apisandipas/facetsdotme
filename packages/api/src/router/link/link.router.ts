import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import {
  createLinkSchema,
  deleteLinkSchema,
  linksByProfileIdSchema,
  updateLinkSchema,
  updateLinkSortOrderSchema,
} from "./link.schema";
import {
  createLink,
  deletelink,
  getLinksByProfileId,
  updateLink,
  updateLinkSortOrder,
} from "./link.service";

export const linkRouter = createTRPCRouter({
  byProfileId: protectedProcedure
    .input(linksByProfileIdSchema)
    .query(async ({ ctx, input }) => getLinksByProfileId({ ctx, input })),
  create: protectedProcedure
    .input(createLinkSchema)
    .mutation(async ({ ctx, input }) => createLink({ ctx, input })),
  update: protectedProcedure
    .input(updateLinkSchema)
    .mutation(async ({ ctx, input }) => updateLink({ ctx, input })),
  updateSortOrder: publicProcedure
    .input(updateLinkSortOrderSchema)
    .mutation(async ({ ctx, input }) => updateLinkSortOrder({ ctx, input })),
  delete: protectedProcedure
    .input(deleteLinkSchema)
    .mutation(async ({ ctx, input }) => deletelink({ ctx, input })),
});
