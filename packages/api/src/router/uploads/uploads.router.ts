import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { GetUploadPresignedUrlSchema } from "./uploads.schema";
import { getUploadPresignedUrl, getUploadedObjects } from "./uploads.service";

export const uploadsRouter = createTRPCRouter({
  getObjects: protectedProcedure.query(({ ctx }) =>
    getUploadedObjects({ ctx }),
  ),
  getUploadPresignedUrl: protectedProcedure
    .input(GetUploadPresignedUrlSchema)
    .mutation(async ({ ctx, input }) => getUploadPresignedUrl({ ctx, input })),
});
