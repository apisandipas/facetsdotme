import { PutObjectCommand, UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import type { Context } from "../../trpc";
import { GetUploadPresignedUrlDto } from "./uploads.schema";

export const getUploadedObjects = async ({
  ctx,
}: {
  ctx: Context;
  input: any;
}) => {
  const objects = await ctx.s3.listObjectsV2({
    Bucket: process.env.BUCKET_NAME,
  });

  return objects ?? [];
};

export const getUploadPresignedUrl = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: GetUploadPresignedUrlDto;
}) => {
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: input.key,
    Region: process.env.REGION,
  });

  return await getSignedUrl(ctx.s3, putObjectCommand);
};
