export const getAllProfiles = async ({ ctx }: any) => {
  return await ctx.prisma.profile.findMany({ orderBy: { id: "desc" } });
};

export const getProfileById = async ({ ctx, input }: any) => {
  return await ctx.prisma.profile.findFirst({ where: { id: input.id } });
};

export const getProfileByUserId = async ({ ctx, input }: any) => {
  return await ctx.prisma.profile.findFirst({
    where: { userId: input.userId },
  });
};

// not currently used as profile is created initially with just handle durint signup
export const createProfile = async ({ ctx, input }: any) => {
  return await ctx.prisma.profile.create({
    data: {
      bio: input.bio,
      handle: input.handle,
    },
  });
};

export const updateProfile = async ({ ctx, input }: any) => {
  return await ctx.prisma.profile.update({
    where: { userId: input.userId },
    data: {
      bio: input.bio,
      handle: input.handle,
    },
  });
};

export const deleteProfile = async ({ ctx, input }: any) => {
  return await ctx.prisma.profile.delete({ where: { id: input.id } });
};
