import { createTRPCRouter, publicProcedure } from "../../trpc";
import {
  checkEmailAvailableSchema,
  checkHandleAvailableSchema,
  userSignUpSchema,
} from "./user.schema";
import {
  checkEmailAvailable,
  checkHandleAvailable,
  signUp,
} from "./user.service";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(userSignUpSchema)
    .mutation(async ({ input, ctx }) => signUp(input, ctx)),

  checkHandleAvailability: publicProcedure
    .input(checkHandleAvailableSchema)
    .mutation(async ({ ctx, input }) => checkHandleAvailable({ input, ctx })),

  checkEmailAvailability: publicProcedure
    .input(checkEmailAvailableSchema)
    .mutation(async ({ ctx, input }) => checkEmailAvailable({ input, ctx })),
});
