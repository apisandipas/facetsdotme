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
  const profile = await ctx.prisma.profile.findFirst({
    where: { handle: input.handle },
    include: {
      links: {
        orderBy: {
          sortOrder: "asc",
        },
      },
      themeSettings: true,
    },
  });
  return profile;
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
  const profile = await ctx.prisma.profile.findFirst({
    where: { userId: input.userId },
    include: {
      links: true,
    },
  });
  return profile;
};

// not currently used as profile is created initially with just handle durint signup
export const createProfile = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: CreateProfileDto;
}) => {
  const profile = await ctx.prisma.profile.create({
    data: {
      bio: input.bio,
      handle: input.handle,
    },
  });

  await ctx.prisma.themeSettings.create({
    data: {
      profileId: profile.id,
    },
  });
  return profile;
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

export const updateProfileImage = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateProfileImageDto;
}) => {
  return await ctx.prisma.profile.update({
    where: { userId: input.userId },
    data: {
      image: input.image,
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
