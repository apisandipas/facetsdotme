import { PrismaClient } from "@facets/db";

import type { Context } from "../../trpc";
import {
  CreateProfileDto,
  DeleteProfileDto,
  ProfileByHandleDto,
  ProfileByIdDto,
  ProfileByUserIdDto,
} from "./profile.schema";

export const getAllProfiles = async ({ ctx }: { ctx: Context }) => {
  return await ctx.prisma.profile.findMany({ orderBy: { id: "desc" } });
};

export const getProfileByHandle = async ({
  ctx,
  input,
}: {
  ctx: Context | { prisma: PrismaClient };
  input: ProfileByHandleDto;
}) => {
  return await ctx.prisma.profile.findFirst({
    where: { handle: input.handle },
    include: {
      links: true,
    },
  });
};

export const getProfileById = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: ProfileByIdDto;
}) => {
  return await ctx.prisma.profile.findFirst({ where: { id: input.id } });
};

export const getProfileByUserId = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: ProfileByUserIdDto;
}) => {
  return await ctx.prisma.profile.findFirst({
    where: { userId: input.userId },
    include: {
      links: true,
    },
  });
};

// not currently used as profile is created initially with just handle durint signup
export const createProfile = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: CreateProfileDto;
}) => {
  return await ctx.prisma.profile.create({
    data: {
      bio: input.bio,
      handle: input.handle,
    },
  });
};

export const updateProfile = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: CreateProfileDto;
}) => {
  return await ctx.prisma.profile.update({
    where: { userId: input.userId },
    data: {
      bio: input.bio,
      handle: input.handle,
    },
  });
};

export const deleteProfile = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: DeleteProfileDto;
}) => {
  return await ctx.prisma.profile.delete({ where: { id: input.id } });
};
