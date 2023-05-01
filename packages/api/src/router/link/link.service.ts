import type { Context } from "../../trpc";
import {
  CreateLinkDto,
  DeleteLinkDto,
  LinksByProfileIdDto,
  UpdateLinkDto,
  UpdateLinkSortOrderDto,
} from "./link.schema";

export const getLinksByProfileId = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: LinksByProfileIdDto;
}) => {
  return await ctx.prisma.link.findMany({
    where: { profileId: input.profileId },
    orderBy: [{ sortOrder: "asc" }],
  });
};

export const createLink = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: CreateLinkDto;
}) => {
  return await ctx.prisma.link.create({
    data: {
      profileId: input.profileId,
      text: input.text,
      url: input.url,
      sortOrder: input.sortOrder,
    },
  });
};

export const updateLink = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateLinkDto;
}) => {
  return await ctx.prisma.link.update({
    where: { id: input.id },
    data: {
      text: input.text,
      url: input.url,
      sortOrder: input.sortOrder,
    },
  });
};

export const updateLinkSortOrder = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateLinkSortOrderDto;
}) => {
  const res = await Promise.all(
    input.links.map(
      async (link) =>
        await ctx.prisma.link.update({
          where: { id: link.id },
          data: {
            sortOrder: link.sortOrder,
          },
        }),
    ),
  );
  return res;
};

export const deletelink = async ({
  ctx,
  input,
}: {
  ctx: any;
  input: DeleteLinkDto;
}) => {
  return await ctx.prisma.link.delete({
    where: { id: input.id },
  });
};
