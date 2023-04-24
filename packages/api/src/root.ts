import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { profileRouter } from "./router/profile";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  user: userRouter,
  profile: profileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
