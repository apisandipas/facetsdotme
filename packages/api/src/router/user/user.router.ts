import { createTRPCRouter, publicProcedure } from "../../trpc";
import { userSignUpSchema } from "./user.schema";
import { signUp } from "./user.service";

export const userRouter = createTRPCRouter({
  signUp: publicProcedure
    .input(userSignUpSchema)
    .mutation(async ({ input, ctx }) => signUp(input, ctx)),
});
