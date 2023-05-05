import Link from "next/link";
import { getProfileByHandle } from "@facets/api/src/router/profile/profile.service";
import { prisma } from "@facets/db";
import { Box, Flex, styled } from "@facets/ui";

import { AvatarPlaceholder } from "~/components/AvatarPlaceholder";

const ProfileLinkButton = styled(Link, {
  display: "flex",
  background: "$slate800",
  alignItems: "center",
  justifyContent: "center",
  p: "1rem",
  mb: "1rem",
  "&:hover": {
    textDecoration: "none",
  },
  variants: {
    variant: {
      SOLID_RECT: {
        borderRadius: 0,
      },
      SOLID_ROUNDISH: {
        borderRadius: "8px",
      },
      SOLID_ROUND: {
        borderRadius: "25px",
      },
    },
  },
});

const ProfileLinksWrapper = styled("div", {
  maxWidth: "600px",
  margin: " 0 auto ",
});

const ProfileWrapper = styled("div", {
  m: "1rem",
});

const PublicProfilePage = ({ profile, error }: any) => {
  if (error && error.type === "UNKNOWN_HANDLE") {
    return <>That handle doesn't exist. Want to claim it? Sign Up now.</>;
  }
  /* console.log({ profile }); */
  const { themeSettings } = profile;

  return (
    <ProfileWrapper>
      <Flex
        css={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mt: "1.5rem",
        }}
      >
        <Box>
          <AvatarPlaceholder size="large" handle={profile.handle} />
        </Box>
        <Box as="h1" css={{ fontSize: "$2xl" }}>
          {profile.handle}
        </Box>
        <Box css={{ mb: "2rem" }}>{profile.bio}</Box>
      </Flex>
      <ProfileLinksWrapper>
        {profile.links.map((link) => {
          return (
            <ProfileLinkButton
              variant={themeSettings.buttonStyle}
              href={link.url}
              key={link.url}
            >
              {link.text}
            </ProfileLinkButton>
          );
        })}
      </ProfileLinksWrapper>
      <Flex>Facets.me</Flex>
    </ProfileWrapper>
  );
};

export default PublicProfilePage;

export const getServerSideProps = async ({ params }) => {
  const handle = params.handle?.[0];
  /* enforce leading @symbol by redirecting when not present */
  if (handle[0] !== "@") {
    return {
      redirect: {
        destination: "/@" + handle,
        permanent: false,
      },
    };
  }

  const ctx = { prisma: prisma };
  const input = { handle };
  const profile = await getProfileByHandle({ ctx, input });

  if (!profile) {
    // If not profile is returned, Return Unknown handle template with claim-it link
    return {
      props: {
        error: {
          type: "UNKNOWN_HANDLE",
        },
      },
    };
  }

  const { bio, links, themeSettings } = profile;
  return {
    props: {
      profile: {
        handle,
        bio,
        links,
        themeSettings,
      },
    },
  };
};
