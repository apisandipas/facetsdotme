import { createTRPCRouter, publicProcedure } from "../../trpc";
import {
  createPostSchema,
  deletePostSchema,
  postByIdSchema,
} from "./post.schema";
import {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
} from "./post.service";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => getAllPosts({ ctx })),
  byId: publicProcedure
    .input(postByIdSchema)
    .query(async ({ ctx, input }) => getPostById({ ctx, input })),
  create: publicProcedure
    .input(createPostSchema)
    .mutation(async ({ ctx, input }) => createPost({ ctx, input })),
  delete: publicProcedure
    .input(deletePostSchema)
    .mutation(async ({ ctx, input }) => deletePost({ ctx, input })),
});
