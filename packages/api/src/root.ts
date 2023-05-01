import { authRouter } from "./router/auth";
import { linkRouter } from "./router/link";
import { profileRouter } from "./router/profile";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  user: userRouter,
  profile: profileRouter,
  link: linkRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
