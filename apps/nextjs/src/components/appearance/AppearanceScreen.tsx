import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { BackgroundAppearance } from "./BackgroundAppearance";
import { ButtonAppearance } from "./ButtonAppearance";
import { ProfileForm } from "./ProfileForm";

export const AppearanceScreen = () => {
  const { data: session } = useSession();
  const profileId = session?.user?.profile.id as string;

  const { data: themeSettings } = api.themeSettings.byProfileId.useQuery({
    profileId,
  });
  return (
    <>
      <h2>Profile</h2>
      <ProfileForm />
      <h2>Appearance</h2>
      <BackgroundAppearance themeSettings={themeSettings} />
      <ButtonAppearance themeSettings={themeSettings} />
    </>
  );
};
