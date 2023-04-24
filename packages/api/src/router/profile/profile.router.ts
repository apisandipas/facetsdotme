import { createTRPCRouter, publicProcedure } from "../../trpc";
import {
  createProfileSchema,
  deleteProfileSchema,
  profileByIdSchema,
  profileByUserIdSchema,
} from "./profile.schema";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileById,
  getProfileByUserId,
  updateProfile,
} from "./profile.service";

export const profileRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => getAllProfiles({ ctx })),
  byId: publicProcedure
    .input(profileByIdSchema)
    .query(async ({ ctx, input }) => getProfileById({ ctx, input })),
  byUserId: publicProcedure
    .input(profileByUserIdSchema)
    .query(async ({ ctx, input }) => getProfileByUserId({ ctx, input })),
  create: publicProcedure
    .input(createProfileSchema)
    .mutation(async ({ ctx, input }) => createProfile({ ctx, input })),
  update: publicProcedure
    .input(createProfileSchema)
    .mutation(async ({ ctx, input }) => updateProfile({ ctx, input })),
  delete: publicProcedure
    .input(deleteProfileSchema)
    .mutation(async ({ ctx, input }) => deleteProfile({ ctx, input })),
});
