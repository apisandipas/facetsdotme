export const getAllPosts = async ({ ctx }: any) => {
  return await ctx.prisma.post.findMany({ orderBy: { id: "desc" } });
};

export const getPostById = async ({ ctx, input }: any) => {
  return await ctx.prisma.post.findFirst({ where: { id: input.id } });
};

export const createPost = async ({ ctx, input }: any) => {
  return await ctx.prisma.post.create({ data: input });
};

export const deletePost = async ({ ctx, input }: any) => {
  return await ctx.prisma.post.delete({ where: { id: input.id } });
};
