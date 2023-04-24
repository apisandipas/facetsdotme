import Link from "next/link";
import { Button, styled } from "@facets/ui";
import { signIn, signOut, useSession } from "next-auth/react";

const StyledNavBar = styled("div", {
  display: "flex",
  alignItems: "center",
  px: "1rem",
  py: "1rem",
});

const RightSection = styled("div", { marginLeft: "auto" });
const LeftSection = styled("div", { marginRight: "auto", px: "1rem" });

export const NavBar = () => {
  const { status, data, ...rest } = useSession();
  return (
    <StyledNavBar>
      Facets.me
      {status === "authenticated" && (
        <LeftSection>
          <Link href="/dashboard">Dashboard</Link>
        </LeftSection>
      )}
      {status === "authenticated" ? (
        <RightSection>
          Welcome, {data.user?.name}
          &nbsp;
          <Button onClick={signOut}>Sign Out</Button>
        </RightSection>
      ) : (
        <RightSection>
          <Button onClick={signIn}>Login</Button>
        </RightSection>
      )}
    </StyledNavBar>
  );
};
