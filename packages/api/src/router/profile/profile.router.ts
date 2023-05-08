import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import {
  createProfileSchema,
  deleteProfileSchema,
  profileByHandleSchema,
  profileByIdSchema,
  profileByUserIdSchema,
  updateProfileImageSchema,
} from "./profile.schema";
import {
  createProfile,
  deleteProfile,
  getAllProfiles,
  getProfileByHandle,
  getProfileById,
  getProfileByUserId,
  updateProfile,
  updateProfileImage,
} from "./profile.service";

export const profileRouter = createTRPCRouter({
  all: publicProcedure.query(async ({ ctx }) => getAllProfiles({ ctx })),
  byHandle: publicProcedure
    .input(profileByHandleSchema)
    .query(async ({ ctx, input }) => getProfileByHandle({ ctx, input })),
  byId: protectedProcedure
    .input(profileByIdSchema)
    .query(async ({ ctx, input }) => getProfileById({ ctx, input })),
  byUserId: protectedProcedure
    .input(profileByUserIdSchema)
    .query(async ({ ctx, input }) => getProfileByUserId({ ctx, input })),
  create: protectedProcedure
    .input(createProfileSchema)
    .mutation(async ({ ctx, input }) => createProfile({ ctx, input })),
  update: protectedProcedure
    .input(createProfileSchema)
    .mutation(async ({ ctx, input }) => updateProfile({ ctx, input })),
  updateImage: protectedProcedure
    .input(updateProfileImageSchema)
    .mutation(async ({ ctx, input }) => updateProfileImage({ ctx, input })),
  delete: protectedProcedure
    .input(deleteProfileSchema)
    .mutation(async ({ ctx, input }) => deleteProfile({ ctx, input })),
});
