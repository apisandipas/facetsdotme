import type { AppType } from "next/app";
import { resetGlobalCss } from "@facets/ui";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { RecoilRoot } from "recoil";

import { api } from "~/utils/api";
import { NotificationProvider } from "~/contexts/NotificationsContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  resetGlobalCss();
  return (
    <SessionProvider session={session}>
      <NotificationProvider>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </NotificationProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
