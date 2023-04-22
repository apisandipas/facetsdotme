import { useAuthContext } from "@/utils/auth";
import { styled, Button } from "ui";

const StyledNavBar = styled("div", {
  display: "flex",
  alignItems: "center",
  px: "1rem",
  py: "1rem",
});

const RightSection = styled("div", { marginLeft: "auto" });

export const NavBar = () => {
  const { user, logout, isAuthenticated } = useAuthContext();
  return (
    <StyledNavBar>
      NavBar
      {isAuthenticated && (
        <RightSection>
          Welcome @{user?.handle}
          &nbsp;
          <Button onClick={logout}>Sign Out</Button>
        </RightSection>
      )}
    </StyledNavBar>
  );
};
