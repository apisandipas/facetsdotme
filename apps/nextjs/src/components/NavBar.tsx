import Link from "next/link";
import {
  AppearanceIcon as AppearanceIconBase,
  Button,
  FacetsIcon as FacetsIconBase,
  Flex,
  LinksIcon as LinksIconBase,
  ProfileIcon as ProfileIconBase,
  SettingsIcon as SettingsIconBase,
  styled,
} from "@facets/ui";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { AvatarPlaceholder } from "./AvatarPlaceholder";
import { UIPopover } from "./PopoverMenu";

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

const RightSection = styled(Flex, { marginLeft: "auto", gap: "0.5rem" });
const LeftSection = styled("div", {
  display: "none",
  marginRight: "auto",
  ml: "2rem",
  px: "1.25rem",
  alignItems: "center",
  gap: "1.5rem",
  "@lg": {
    display: "flex",
  },
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

const MobilePopoverMenu = styled(UIPopover, {
  display: "block",
  "@lg": {
    display: "none",
  },
});

const NavigationLink = ({ href, children }) => {
  return (
    <NavLink href={href} active={href === window.location.pathname}>
      {children}
    </NavLink>
  );
};

const HideOnDesktop = styled("div", {
  display: "flex",
  "@lg": {
    display: "none",
  },
});
const HideOnMobile = styled("div", {
  display: "none",
  "@lg": {
    display: "flex",
  },
});

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
  display: "inline-block",
});

const FacetsIconDesktop = styled(FacetsIcon, {
  display: "none",
  "@lg": {
    display: "inline-block",
  },
});

const WelcomeMsg = styled("span", {
  display: "none",
  "@lg": {
    display: "inline-block",
    mr: "1rem",
  },
});

const navConfig = [
  { text: "Links", icon: <LinksIcon />, url: "/dashboard/links" },
  {
    text: "Appearance",
    icon: <AppearanceIcon />,
    url: "/dashboard/appearance",
  },
  { text: "Analytics", icon: <ProfileIcon />, url: "/dashboard/analytics" },
  { text: "Settings", icon: <SettingsIcon />, url: "/dashboard/settings" },
];

const NavLinks = () => {
  return navConfig.map(({ text, icon, url }, index) => (
    <NavLink href={url} key={`nav-link-${index}`}>
      {icon}
      {text}
    </NavLink>
  ));
};

export const NavBar = () => {
  const { status, data } = useSession();
  const { data: profile } = api.profile.byUserId.useQuery({
    userId: data?.user?.id,
  });
  console.log({ session: data });
  const signMeOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <StyledNavBar>
      <HideOnMobile>
        <FacetsIcon />
      </HideOnMobile>
      {status === "authenticated" && (
        <>
          <MobilePopoverMenu
            trigger={
              <HideOnDesktop>
                <FacetsIcon />
              </HideOnDesktop>
            }
            content={<NavLinks />}
          />
          <LeftSection>
            {navConfig.map(({ text, icon, url }, index) => {
              return (
                <NavigationLink href={url} key={`navigation-link-${index}`}>
                  {icon}
                  {text}
                </NavigationLink>
              );
            })}
          </LeftSection>
        </>
      )}
      {status === "authenticated" ? (
        <RightSection>
          {/* <WelcomeMsg>Welcome, {data.user?.profile?.handle}</WelcomeMsg> */}
          <AvatarPlaceholder
            size="small"
            image={profile?.image}
            handle={data.user?.profile?.handle}
          />
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
