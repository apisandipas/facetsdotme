import { useSession } from "next-auth/react";

import { api } from "../api";

export const useThemeSettings = () => {
  const { data: session } = useSession();
  const profileId = session?.user?.profile.id as string;

  const { data: themeSettings } = api.themeSettings.byProfileId.useQuery({
    profileId,
  });
  return {
    themeSettings,
    profileId,
  };
};
