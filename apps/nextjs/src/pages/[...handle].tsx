import Link from "next/link";
import { getProfileByHandle } from "@facets/api/src/router/profile/profile.service";
import { prisma } from "@facets/db";
import { Box, Flex, styled } from "@facets/ui";

import { useThemedComponents } from "~/utils/hooks/useThemedComponents";
import { AvatarPlaceholder } from "~/components/AvatarPlaceholder";

const ProfileWrapper = styled(Flex, {
  p: "1rem",
  /* justifyContent: "center", */
  flexDirection: "column",
  alignItems: "center",
  height: "$full",
});

const ProfileLinksWrapper = styled(Flex, {
  maxWidth: "600px",
  width: "$full",
  flexDirection: "column",
  alignItems: "center",
});

const PublicProfilePage = ({ profile, error }: any) => {
  if (error && error.type === "UNKNOWN_HANDLE") {
    return <>That handle doesn't exist. Want to claim it? Sign Up now.</>;
  }

  const { themeSettings } = profile;
  const { buttonStyle, buttonBGColor, buttonFGColor, buttonShadowColor } =
    themeSettings;

  const { components, safeForegroundColor } =
    useThemedComponents(themeSettings);
  const { ProfilePage, ProfileLinkButton } = components;

  return (
    <ProfilePage>
      <ProfileWrapper>
        <Flex
          css={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
          {profile.links.map((link: any) => {
            return (
              <ProfileLinkButton
                buttonStyle={buttonStyle}
                href={link.url}
                key={link.url}
                css={{
                  color: buttonFGColor,
                }}
              >
                {link.text}
              </ProfileLinkButton>
            );
          })}
        </ProfileLinksWrapper>
        <Flex
          css={{
            mt: "auto",
          }}
        >
          <Box>
            <img src="/facets-icon.svg" />
          </Box>
          <Flex
            css={{ ml: "1rem", height: "32px", color: safeForegroundColor }}
          >
            Facets.me
          </Flex>
        </Flex>
      </ProfileWrapper>
    </ProfilePage>
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
