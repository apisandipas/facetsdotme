export const getAllProfiles = async ({ ctx }: any) => {
  return await ctx.prisma.profile.findMany({ orderBy: { id: "desc" } });
};

export const getProfileById = async ({ ctx, input }: any) => {
  return await ctx.prisma.profile.findFirst({ where: { id: input.id } });
};

export const getProfileByUserId = async ({ ctx, input }: any) => {
  return await ctx.prisma.profile.findFirst({
    where: { userId: input.userId },
    include: {
      links: true,
    },
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
      // links: {
      //   // NOTE This likely is a vert inefficient way to do this.
      //   // This IDs for links will change each time, though there
      //   // additional meta data will likely stay the same?
      //   // (Could be an issue when it comes to writing analytics related features)
      //   deleteMany: {
      //     id: {
      //       in: input.links.reduce((acc: any[], link: any) => {
      //         if (link.id) {
      //           acc.push(link.id);
      //           return acc;
      //         }
      //       }, []),
      //     },
      //   },
      //   createMany: { data: input.links },
      // },
    },
  });
};

export const deleteProfile = async ({ ctx, input }: any) => {
  return await ctx.prisma.profile.delete({ where: { id: input.id } });
};
