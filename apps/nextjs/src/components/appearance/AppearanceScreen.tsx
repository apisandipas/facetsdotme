import { BackgroundAppearance } from "./BackgroundAppearance";
import { ButtonAppearance } from "./ButtonAppearance";
import { FontAppearance } from "./FontAppearance";
import { ProfileForm } from "./ProfileForm";

export const AppearanceScreen = () => {
  return (
    <>
      <h2>Profile</h2>
      <ProfileForm />
      <h2>Appearance</h2>
      <BackgroundAppearance />
      <ButtonAppearance />
      <FontAppearance />
    </>
  );
};
