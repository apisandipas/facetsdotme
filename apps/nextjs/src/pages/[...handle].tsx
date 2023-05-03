import Link from "next/link";
import { getProfileByHandle } from "@facets/api/src/router/profile/profile.service";
import { prisma } from "@facets/db";

const PublicProfilePage = ({ profile, error }: any) => {
  if (error && error.type === "UNKNOWN_HANDLE") {
    return <>That handle doesn't exist. Want to claim it? Sign Up now.</>;
  }

  return (
    <div>
      Public Profile Page Welcome from {profile.handle}
      <div>{profile.bio}</div>
      {profile.links.map((link) => {
        return <Link href={link.url}>{link.text}</Link>;
      })}
    </div>
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

  return {
    props: {
      profile: {
        handle: profile.handle,
        bio: profile.bio,
        links: profile.links,
      },
    },
  };
};
