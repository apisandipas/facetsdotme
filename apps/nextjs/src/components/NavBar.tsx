import Link from "next/link";
import {
  AppearanceIcon as AppearanceIconBase,
  Button,
  FacetsIcon as FacetsIconBase,
  LinksIcon as LinksIconBase,
  ProfileIcon as ProfileIconBase,
  SettingsIcon as SettingsIconBase,
  styled,
} from "@facets/ui";
import { signIn, signOut, useSession } from "next-auth/react";

const StyledNavBar = styled("div", {
  display: "flex",
  alignItems: "center",
  px: "1.5rem",
  py: "0.5rem",
  my: "0.5rem",
  mx: "0.5rem",
  borderRadius: "50px",
  boxShadow: "$md",
  color: "$slate200",
  backgroundColor: "$slate700",
});

const RightSection = styled("div", { marginLeft: "auto" });
const LeftSection = styled("div", {
  marginRight: "auto",
  ml: "2rem",
  px: "1.25rem",
  display: "flex",
  alignItems: "center",
  gap: "1.5rem",
});

const NavLink = styled(Link, {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem",
  "&:hover": {
    color: "$rose500",
    textDecoration: "none",
    backgroundColor: "$slate900",
    borderRadius: "25px",
  },
  variants: {
    active: {
      true: {
        color: "$rose500",
        backgroundColor: "$slate900",
        borderRadius: "25px",
      },
    },
  },
});

const NavigationLink = ({ href, children }) => {
  return (
    <NavLink href={href} active={href === window.location.pathname}>
      {children}
    </NavLink>
  );
};

const AppearanceIcon = styled(AppearanceIconBase, {
  fill: "$slate200",
});
const LinksIcon = styled(LinksIconBase, {
  fill: "$slate200",
});
const ProfileIcon = styled(ProfileIconBase, {
  fill: "$slate200",
});
const SettingsIcon = styled(SettingsIconBase, {
  fill: "$slate200",
});

const FacetsIcon = styled(FacetsIconBase, {
  fill: "$slate200",
  border: "1px solid pink",
  height: "24px",
  width: "24px",
  transform: "rotate(90degs)",
});

export const NavBar = () => {
  const { status, data, ...rest } = useSession();
  const signMeOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <StyledNavBar>
      <FacetsIcon />
      {status === "authenticated" && (
        <LeftSection>
          <NavigationLink href="/dashboard/profile">
            <ProfileIcon />
            Profile
          </NavigationLink>
          <NavigationLink href="/dashboard/links">
            <LinksIcon />
            Links
          </NavigationLink>
          <NavigationLink href="/dashboard/appearance">
            <AppearanceIcon />
            Appearance
          </NavigationLink>
          <NavigationLink href="/dashboard/settings">
            <SettingsIcon />
            Settings
          </NavigationLink>
        </LeftSection>
      )}
      {status === "authenticated" ? (
        <RightSection>
          Welcome, {data.user?.profile?.handle}
          &nbsp;
          <Button onClick={signMeOut}>Sign Out</Button>
        </RightSection>
      ) : (
        <RightSection>
          <Button onClick={signIn}>Login</Button>
        </RightSection>
      )}
    </StyledNavBar>
  );
};
