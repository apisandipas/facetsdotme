import { z } from "zod";

export const GetUploadPresignedUrlSchema = z.object({
  key: z.string(),
});

export type GetUploadPresignedUrlDto = z.TypeOf<
  typeof GetUploadPresignedUrlSchema
>;
