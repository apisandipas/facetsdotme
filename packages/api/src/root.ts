import { authRouter } from "./router/auth";
import { linkRouter } from "./router/link";
import { profileRouter } from "./router/profile";
import { themeSettingsRouter } from "./router/themeSettings";
import { uploadsRouter } from "./router/uploads";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  link: linkRouter,
  profile: profileRouter,
  themeSettings: themeSettingsRouter,
  uploads: uploadsRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
