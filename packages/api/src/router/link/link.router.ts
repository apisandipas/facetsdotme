import { createTRPCRouter, publicProcedure } from "../../trpc";
import {
  createOrUpdateLinksSchema,
  linksByProfileIdSchema,
} from "./link.schema";
import { createOrUpdateLinks, g, getLinksByProfileId } from "./link.service";

export const linkRouter = createTRPCRouter({
  byProfileId: publicProcedure
    .input(linksByProfileIdSchema)
    .query(async ({ ctx, input }) => getLinksByProfileId({ ctx, input })),
  createOrUpdate: publicProcedure
    .input(createOrUpdateLinksSchema)
    .mutation(async ({ ctx, input }) => createOrUpdateLinks({ ctx, input })),
});
