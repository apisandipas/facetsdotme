export const getLinksByProfileId = async ({ ctx, input }: any) => {
  return await ctx.prisma.link.findMany({
    where: { profileId: input.profileId },
  });
};

export const createOrUpdateLinks = async ({ ctx, input }: any) => {
  const currentLinks = await ctx.prisma.link.findMany({
    where: { profileId: input.profileId },
  });

  const linkIdsToUpdate = input.links.reduce((acc, link) => {
    if (link.id) {
      acc.push(link.id);
    }
    return acc;
  }, []);

  const linkIdsToDelete = currentLinks
    .reduce((acc, link) => {
      acc.push(link.id);
      return acc;
    }, [])
    .filter((x) => !linkIdsToUpdate.includes(x));

  const allTheThings = input.links.reduce((acc: any[], link: any) => {
    const thing = {
      where: { id: link.id || "" },
      create: link,
    };
    acc.push(thing);
    return acc;
  }, []);

  return await ctx.prisma.profile.update({
    where: { id: input.profileId },
    data: {
      links: {
        connectOrCreate: allTheThings,
        deleteMany: { id: { in: linkIdsToDelete } },
      },
    },
  });
};
